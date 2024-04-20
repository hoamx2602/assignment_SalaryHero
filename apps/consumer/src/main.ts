import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { RabbitMQService } from '@app/common';
import { SALARY_SERVICE } from './constants/rabbitmq';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice(rabbitMQService.getOptions(SALARY_SERVICE));
  await app.startAllMicroservices();
}
bootstrap();
