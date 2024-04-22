import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { IJobTask, RabbitMQService } from '@app/common';
import { EVENT_JOB_NAME } from './constants/rabbitmq';

@Controller()
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @EventPattern(EVENT_JOB_NAME)
  async taskHandle(@Payload() data: IJobTask, @Ctx() context: RmqContext) {
    this.consumerService.handleTask(data);
    // if process success, we acked message
    this.rabbitMQService.ack(context);
  }
}
