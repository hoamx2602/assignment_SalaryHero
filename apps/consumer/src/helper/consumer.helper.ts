import {
  User,
  UserRepository,
  UserSalaryConfiguration,
  UserSalaryConfigurationRepository
} from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ConsumerHelper {
  private readonly logger = new Logger(ConsumerHelper.name);

  constructor(
    private userRepository: UserRepository,
    private userSalaryConfigRepository: UserSalaryConfigurationRepository
  ) {}

  async getUserCalculateInfor (userId: string, companyId: string) {
    const user: User = await this.userRepository.findOne({
      _id: new Types.ObjectId(userId)
    });

    const userSalaryConfig: UserSalaryConfiguration = await this.userSalaryConfigRepository.getUserSalaryConfigByEmail(userId, companyId);
    return {
      user,
      userSalaryConfig
    };
  }

  dailyIncomeFormula(baseSalary: number, numberWorkingDay: number): number {
    return Number((baseSalary / numberWorkingDay).toFixed(5));
  }
}
