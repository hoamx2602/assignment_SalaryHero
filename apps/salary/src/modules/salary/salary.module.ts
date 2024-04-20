import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
@Module({
  imports: [CoreModule],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
