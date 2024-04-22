import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { CompanyRepository, JobLogRepository, RabbitMQModule, UserRepository } from '@app/common';
import { SALARY_SERVICE } from '../../constants/rabbitmq';
import { TaskHelper } from './helper/task.helper';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [
    CoreModule,
    RabbitMQModule.register({
      name: SALARY_SERVICE,
    }),
  ],
  providers: [TaskService, TaskHelper, UserRepository, JobLogRepository, CompanyRepository],
})
export class TaskModule {}
