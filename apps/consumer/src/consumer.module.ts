import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { Company, CompanySchema, DatabaseModule, JobLog, JobLogRepository, JobLogSchema, RabbitMQModule, User, UserBalance, UserBalanceHistory, UserBalanceHistorySchema, UserBalanceSchema, UserSalaryConfiguration, UserSalaryConfigurationSchema, UserSchema } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { SALARY_SERVICE } from './constants/rabbitmq';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_SALARY_QUEUE: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserBalance.name,
        schema: UserBalanceSchema,
      },
      {
        name: Company.name,
        schema: CompanySchema,
      },
      {
        name: UserSalaryConfiguration.name,
        schema: UserSalaryConfigurationSchema,
      },
      {
        name: UserBalanceHistory.name,
        schema: UserBalanceHistorySchema,
      },
      {
        name: JobLog.name,
        schema: JobLogSchema,
      },
    ]),
    RabbitMQModule.register({
      name: SALARY_SERVICE,
    }),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService, JobLogRepository],
})
export class ConsumerModule {}
