import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SALARY_SERVICE } from '../../constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(@Inject(SALARY_SERVICE) private salaryClient: ClientProxy) {
    this.salaryClient.connect();
  }
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    await lastValueFrom(
      this.salaryClient.emit('task_handle', {
        user: 'email',
      }),
    );

    this.logger.debug('Called when the current second is 5');
  }
}
