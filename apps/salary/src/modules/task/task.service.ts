import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { TaskHelper } from './helper/task.helper';
import * as moment from "moment";
import {
  Company,
  CompanyRepository,
  EVENT_JOB_NAME,
  IJobTask,
  JobLog,
  JobLogRepository,
  JobState,
  SALARY_SERVICE_QUEUE,
  User,
  UserRepository,
  generateJobKey
} from '@app/common';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @Inject(SALARY_SERVICE_QUEUE) private salaryClient: ClientProxy,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly jobLogRepository: JobLogRepository,
    private taskHelper: TaskHelper,
  ) {
    this.salaryClient.connect();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      const currentTimeHour = moment().hour();

      const timeZoneAtMidNight = this.taskHelper.getMidNightTimezone(currentTimeHour);
      this.logger.log("CurrentTimeHour", { currentTimeHour, timeZoneAtMidNight });
      const companyByTimezones: Company[] = await this.companyRepository.getCompaniesByTimezones(timeZoneAtMidNight);

      // Check if no companies run at midnight -> return;
      if (!companyByTimezones.length) return;

      for (const company of companyByTimezones) {
        const usersBelongToCompany: User[] = await this.userRepository.getAllUserByCompany(company._id.toString());

        if (!usersBelongToCompany.length) return;

        const timeCalculate = this.taskHelper.getCurrentCompanyTimeCalculate(company.timezone);

        for (const user of usersBelongToCompany) {
          const jobKey = generateJobKey(user._id.toString(), company._id.toString());

          const isJobCreated: JobLog | false = await this.isCreatedJobTask(jobKey, timeCalculate);


          // If job (include companyId and userId) not created then create new job logs
          if (!isJobCreated) {
            await Promise.all([
              this.createNewTaskJob(company._id.toString(), user._id.toString(), timeCalculate),
              // create job logs
              this.jobLogRepository.create({ job_key: jobKey, day_caculate: timeCalculate, job_state: JobState.PENDING })
            ]);
          } else if (isJobCreated.job_state === JobState.PENDING) { // if job state still pending then send again
            await this.createNewTaskJob(company._id.toString(), user._id.toString(), timeCalculate)
          }
        }
      }
    } catch (error) {
      this.logger.error("HandleCronError", JSON.stringify(error));
    }
  }

  async createNewTaskJob(companyId: string, userId: string, dateTime: number): Promise<void> {
    try {
      const payload: IJobTask = { user_id: userId, company_id: companyId, dateTime };
      this.salaryClient.emit(EVENT_JOB_NAME, payload);
    } catch (error) {
      this.logger.error('CANNOT_SEND_TASK_HANDLE', JSON.stringify({ companyId, userId, date: moment()}));
      throw error;
    }
  }

  async isCreatedJobTask(jobKey: string, calculateTime: number): Promise<JobLog | false> {
    const jobLog = await this.jobLogRepository.getJobLogByKey(jobKey)

    return (jobLog && jobLog.day_caculate === calculateTime) ? jobLog : false;
  }
}
