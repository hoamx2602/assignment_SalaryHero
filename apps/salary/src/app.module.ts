import { Module } from '@nestjs/common';
import modules from './modules';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [...modules, ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class SalaryModule {}
