import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { RabbitMQService, SALARY_SERVICE_QUEUE } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice(rabbitMQService.getOptions(SALARY_SERVICE_QUEUE));
  await app.startAllMicroservices();
}
bootstrap();
