import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RabbitMQService } from '@app/common';

@Controller()
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @EventPattern('task_handle')
  async taskHandle(@Payload() data: any, @Ctx() context: RmqContext) {
    this.consumerService.handleTask(data);
    this.rabbitMQService.ack(context);
  }
}
