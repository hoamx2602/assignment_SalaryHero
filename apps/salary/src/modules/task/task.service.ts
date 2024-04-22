import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SALARY_SERVICE } from '../../constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { TaskHelper } from './helper/task.helper';
import * as moment from "moment";
import { CompanyRepository, JobLogRepository, JobState, UserRepository } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @Inject(SALARY_SERVICE) private salaryClient: ClientProxy,
    private readonly companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository,
    private readonly jobLogRepository: JobLogRepository,
    private taskHelper: TaskHelper,
    private readonly configService: ConfigService,
  ) {
    this.salaryClient.connect();
  }

  // @Cron(CronExpression.EVERY_HOUR)
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    console.log(moment())
    console.log(this.configService.get<string>("EVENT_JOB_NAME"));
    const currentTimeHour = moment().hour();
    console.log('🟢====>currentTimeHour', currentTimeHour);
    const timeZoneAtMidNight = this.taskHelper.getMidNightTimezone(currentTimeHour);
    console.log('🟢====>timeZoneAtMidNight', timeZoneAtMidNight);
    const companyByTimezones = await this.companyRepository.getCompaniesByTimezones(timeZoneAtMidNight);

    if (!companyByTimezones.length) return;

    for (const company of companyByTimezones) {
      const usersBelongToCompany = await this.userRepository.getAllUserByCompany(company._id.toString());

      if (!usersBelongToCompany.length) return;

      const timeCalculate = this.taskHelper.getCurrentCompanyTimeCalculate(company.timezone);

      for (const user of usersBelongToCompany) {
        const jobKey = `task_handle_${company._id.toString()}_${user._id.toString()}`;

        const isJobCreated = await this.isCreatedJobTask(jobKey, timeCalculate.unix());
        // If job (include companyId and userId) not created then create new job
        if (!isJobCreated) {
          await this.createNewTaskJob(company._id.toString(), user._id.toString());
          // create job logs
          await this.jobLogRepository.create({ job_key: jobKey, day_caculate: timeCalculate.unix(), job_state: JobState.PENDING });
        }
      }
    }
  }

  async createNewTaskJob(companyId: string, userId: string): Promise<void> {
    const eventName = this.configService.get<string>("EVENT_JOB_NAME");
    try {
      this.salaryClient.emit(eventName, { user_id: userId });
    } catch (error) {
      this.logger.error('CANNOT_SEND_TASK_HANDLE', { companyId, userId, date: moment()});
    }
  }

  async isCreatedJobTask(jobKey: string, calculateTime: number): Promise<boolean> {
    const jobLog = await this.jobLogRepository.getJobLogByKey(jobKey, calculateTime)

    return !!jobLog;
  }
}
