import { IJobTask, JobLogRepository, JobState, generateJobKey } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);
  constructor(
    private jobLogRepository: JobLogRepository
  ) {

  }

  async handleTask(data: IJobTask) {
    const { user_id, company_id } = data;

    const jobKey = generateJobKey(user_id, company_id);

    const job = await this.jobLogRepository.getJobLogByKey(jobKey);

    if (job.job_state === JobState.PENDING || job.job_state !== JobState.COMPLETED) {
      console.log("HELLLELELELELELE")
    }
  }
}
