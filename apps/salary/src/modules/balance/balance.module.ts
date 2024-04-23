import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { AuthModule, RabbitMQModule, SALARY_SERVICE_QUEUE, UserBalanceHistoryRepository, UserBalanceRepository } from '@app/common';
@Module({
  imports: [CoreModule, AuthModule, RabbitMQModule.register({
    name: SALARY_SERVICE_QUEUE
  })],
  controllers: [BalanceController],
  providers: [BalanceService, UserBalanceRepository, UserBalanceHistoryRepository],
})
export class BalanceModule {}
