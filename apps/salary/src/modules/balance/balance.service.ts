import { UserBalance, UserBalanceRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { GetUserBalanceDto } from './dto';

@Injectable()
export class BalanceService {
  constructor(private readonly userBalanceRepository: UserBalanceRepository) {}

  async getUserBalance(
    getUserBalanceDto: GetUserBalanceDto,
  ): Promise<UserBalance> {
    return this.userBalanceRepository.getUserBalance(getUserBalanceDto.email);
  }
}
