import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RabbitMQService } from '@app/common';
import { AUTH_SERVICE_QUEUE } from './constants/rabbitmq';
import { RmqOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    cors: true
  });
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice<RmqOptions>(rabbitMQService.getOptions(AUTH_SERVICE_QUEUE, true));

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle(`${process.env.APP_NAME} API`)
      .setDescription('The apis for auth app')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }


  await app.startAllMicroservices();
  await app.listen(Number(configService.get('PORT')));
}
bootstrap();
