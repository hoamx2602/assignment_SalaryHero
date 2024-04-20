import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { UserBalanceRepository } from '@app/common';
@Module({
  imports: [CoreModule],
  controllers: [BalanceController],
  providers: [BalanceService, UserBalanceRepository],
})
export class BalanceModule {}
