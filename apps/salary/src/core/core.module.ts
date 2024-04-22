import {
  Company,
  CompanySchema,
  DatabaseModule,
  JobLog,
  JobLogSchema,
  User,
  UserBalance,
  UserBalanceHistorySchema,
  UserBalanceSchema,
  UserSalaryConfiguration,
  UserSalaryConfigurationSchema,
  UserSchema,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/salary/.env',
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
        name: UserBalance.name,
        schema: UserBalanceHistorySchema,
      },
      {
        name: JobLog.name,
        schema: JobLogSchema,
      },
    ]),
  ],
  exports: [ConfigModule, DatabaseModule, MongooseModule],
})
export class CoreModule {}
