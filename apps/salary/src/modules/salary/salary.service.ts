import {
  UserBalance,
  UserBalanceRepository,
  UserRepository,
  UserSalaryConfigurationRepository,
} from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { SalaryConfigurationDto } from './dto';

@Injectable()
export class SalaryService {
  protected readonly logger = new Logger(SalaryService.name);
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly userSalaryConfigurationRepository: UserSalaryConfigurationRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async getSalaryByEmail(email: string): Promise<UserBalance> {
    return this.userBalanceRepository.findOne({
      email,
    });
  }

  async userSalaryConfigurations(
    companyId: string,
    salaryConfigurationDto: SalaryConfigurationDto,
  ) {
    const { user_email } = salaryConfigurationDto;
    await this.userRepository.findUserByEmail(user_email);

    const userSalaryConfiguration =
      await this.userSalaryConfigurationRepository.findOneAndUpdate(
        {
          user_email,
        },
        {
          company_id: companyId,
          ...salaryConfigurationDto,
        },
      );

    this.logger.debug(
      'CreateUserSalaryConfigurations',
      JSON.stringify({
        companyId,
        salaryConfigurationDto,
      }),
    );

    return userSalaryConfiguration;
  }
}
