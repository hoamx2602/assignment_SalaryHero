import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { Company, CompanySchema, DatabaseModule, IncomeHistory, IncomeHistoryRepository, IncomeHistorySchema, JobLog, JobLogRepository, JobLogSchema, RabbitMQModule, User, UserBalance, UserBalanceHistory, UserBalanceHistorySchema, UserBalanceRepository, UserBalanceSchema, UserRepository, UserSalaryConfiguration, UserSalaryConfigurationRepository, UserSalaryConfigurationSchema, UserSchema } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { SALARY_SERVICE } from './constants/rabbitmq';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerHelper } from './helper/consumer.helper';

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
      {
        name: IncomeHistory.name,
        schema: IncomeHistorySchema,
      },
    ]),
    RabbitMQModule.register({
      name: SALARY_SERVICE,
    }),
  ],
  controllers: [ConsumerController],
  providers: [
    ConsumerService,
    JobLogRepository,
    UserRepository,
    UserSalaryConfigurationRepository,
    ConsumerHelper,
    IncomeHistoryRepository,
    UserBalanceRepository
  ],
})
export class ConsumerModule {}
