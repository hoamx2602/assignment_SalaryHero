import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { RabbitMQModule } from '@app/common';
import { SALARY_SERVICE } from '../../constants/rabbitmq';

@Module({
  imports: [
    RabbitMQModule.register({
      name: SALARY_SERVICE,
    }),
  ],
  providers: [TaskService],
})
export class TaskModule {}
