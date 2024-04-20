import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import {
  UserBalanceRepository,
  UserRepository,
  UserSalaryConfigurationRepository,
} from '@app/common';
@Module({
  imports: [CoreModule],
  controllers: [SalaryController],
  providers: [
    SalaryService,
    UserBalanceRepository,
    UserSalaryConfigurationRepository,
    UserRepository,
  ],
})
export class SalaryModule {}
