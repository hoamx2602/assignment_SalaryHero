import { UserBalance, UserBalanceRepository } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {
  constructor(private readonly userBalanceRepository: UserBalanceRepository) {}

  async getUserBalance(userId: string): Promise<UserBalance> {
    const userBalance = await this.userBalanceRepository.getUserBalance(userId);
    if (!userBalance) {
      throw new BadRequestException("UserNotHaveBalance");
    }
    return userBalance;
  }
}
