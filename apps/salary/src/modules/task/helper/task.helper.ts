import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from "moment";

@Injectable()
export class TaskHelper {
  protected readonly logger = new Logger(TaskHelper.name);
  constructor(
    private readonly configService: ConfigService,
  ) {}

  getMidNightTimezone(
    currentTime: number,
    currentUTCTime = Number(this.configService.get<number>('CURRENT_TIMEZONE_SERVER')),
  ) {
    return currentTime - currentUTCTime;
  }

  getCurrentCompanyTimeCalculate (companyTimezone: number): number {
    // Get current time at company timezone and then round time to o'clock time and subtract 1 to get the datetime calculation
    return moment().utcOffset(companyTimezone * 60).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(1, "days").unix();
  }
}
