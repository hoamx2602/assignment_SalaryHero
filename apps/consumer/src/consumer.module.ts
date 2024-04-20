import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { RabbitMQModule } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { SALARY_SERVICE } from './constants/rabbitmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_SALARY_QUEUE: Joi.string().required(),
      }),
    }),
    RabbitMQModule.register({
      name: SALARY_SERVICE,
    }),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
