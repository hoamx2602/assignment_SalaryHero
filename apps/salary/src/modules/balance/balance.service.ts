import { UserBalance, UserBalanceRepository } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUserBalanceDto } from './dto';

@Injectable()
export class BalanceService {
  constructor(private readonly userBalanceRepository: UserBalanceRepository) {}

  async getUserBalance(
    getUserBalanceDto: GetUserBalanceDto,
  ): Promise<UserBalance> {
    const userBalance = await this.userBalanceRepository.getUserBalance(getUserBalanceDto.email);
    if (!userBalance) {
      throw new BadRequestException("UserNotHaveBalance");
    }
    return userBalance;
  }
}
