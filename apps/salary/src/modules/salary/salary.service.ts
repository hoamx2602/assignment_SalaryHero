import {
  UserBalance,
  UserBalanceRepository,
  UserRepository,
  UserSalaryConfigurationRepository,
} from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { SalaryConfigurationDto } from './dto';
import { Types } from 'mongoose';

@Injectable()
export class SalaryService {
  protected readonly logger = new Logger(SalaryService.name);
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly userSalaryConfigurationRepository: UserSalaryConfigurationRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async getSalaryByEmail(email: string): Promise<UserBalance> {
    return this.userBalanceRepository.findOne({ email });
  }

  async userSalaryConfigurations (companyId: string, salaryConfigurationDto: SalaryConfigurationDto) {
    const { user_id } = salaryConfigurationDto;
    await this.userRepository.findOne({_id: new Types.ObjectId(user_id)});

    const userSalaryConfiguration =
      await this.userSalaryConfigurationRepository.findOneAndUpdate(
        {
          user_id,
        },
        {
          company_id: companyId,
          ...salaryConfigurationDto,
        },
      );

    this.logger.debug('CreateUserSalaryConfigurations',JSON.stringify({ companyId, salaryConfigurationDto}));

    return userSalaryConfiguration;
  }
}
