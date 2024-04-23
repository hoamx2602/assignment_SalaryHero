import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CompanyRepository,
  JobLogRepository,
  RabbitMQModule,
  SALARY_SERVICE_QUEUE,
  UserRepository
} from '@app/common';
import { TaskHelper } from './helper/task.helper';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [
    CoreModule,
    RabbitMQModule.register({
      name: SALARY_SERVICE_QUEUE,
    }),
  ],
  providers: [
    TaskService,
    TaskHelper,
    UserRepository,
    JobLogRepository,
    CompanyRepository
  ],
})
export class TaskModule {}
