import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { JobLog } from './job_log.schema';

@Injectable()
export class JobLogRepository extends AbstractRepository<JobLog> {
  protected readonly logger = new Logger(JobLogRepository.name);

  constructor(
    @InjectModel(JobLog.name) jobLogModel: Model<JobLog>,
    @InjectConnection() connection: Connection,
  ) {
    super(jobLogModel, connection);
  }

  async getJobLogByKey(key: string): Promise<JobLog> {
    return this.model.findOne({
      job_key: key
    });
  }
}
