import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import {
  RabbitMQModule,
  SALARY_SERVICE_QUEUE,
  UserBalanceRepository,
  UserRepository,
  UserSalaryConfigurationRepository,
} from '@app/common';
@Module({
  imports: [
    CoreModule,
    RabbitMQModule.register({
      name: SALARY_SERVICE_QUEUE,
    }),
  ],
  controllers: [SalaryController],
  providers: [
    SalaryService,
    UserBalanceRepository,
    UserSalaryConfigurationRepository,
    UserRepository,
  ],
})
export class SalaryModule {}
