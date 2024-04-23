import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AUTH_SERVICE_QUEUE } from '../constants';
import { RabbitMQModule } from '../rabbitmq';

@Module({
  imports: [RabbitMQModule.register({ name: AUTH_SERVICE_QUEUE })],
  exports: [RabbitMQModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
