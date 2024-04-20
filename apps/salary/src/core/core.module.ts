import {
  DatabaseModule,
  User,
  UserBalance,
  UserBalanceSchema,
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
    ]),
  ],
  exports: [ConfigModule, DatabaseModule, MongooseModule],
})
export class CoreModule {}
