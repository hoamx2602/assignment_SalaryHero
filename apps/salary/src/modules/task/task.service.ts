import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SALARY_SERVICE } from '../../constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TaskService {
  constructor(@Inject(SALARY_SERVICE) private salaryClient: ClientProxy) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
