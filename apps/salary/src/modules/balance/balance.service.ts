import { ActionType, User, UserBalance, UserBalanceHistory, UserBalanceHistoryRepository, UserBalanceRepository } from '@app/common';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { WithdrawMoneyDto } from './dto';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger(BalanceService.name);
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly userBalanceHistoryRespository: UserBalanceHistoryRepository,
  ) {}

  async getUserBalance(userId: string): Promise<UserBalance> {
    const userBalance = await this.userBalanceRepository.getUserBalance(userId);
    if (!userBalance) {
      throw new BadRequestException("UserNotHaveBalance");
    }
    return userBalance;
  }

  async withdrawMoney(user: User, withdrawMoneyDto: WithdrawMoneyDto) {
    const { amount } = withdrawMoneyDto;
    const userId = user._id.toString();
    const userBalance = await this.userBalanceRepository.getUserBalance(userId);

    if (!userBalance || !userBalance.is_active) {
      throw new BadRequestException("Cannot use balance!");
    }

    if (userBalance && userBalance.available_balance < amount) {
      throw new BadRequestException("Your amount exceed the available balance!")
    }

    // Get total available balance and subtract it for amount
    userBalance.available_balance = userBalance.available_balance - amount;
    // If the amount < 0 then deactivate the user balance
    if (userBalance.available_balance < 0) userBalance.is_active = false;

    // Create new user balance history
    const newUserBalanceHistory = new UserBalanceHistory();
    newUserBalanceHistory.action_type = ActionType.WITHDRAW;
    newUserBalanceHistory.user_id = userId;
    newUserBalanceHistory.amount = amount;

    // Create transaction
    const session = await this.userBalanceRepository.startTransaction();
    try {
      await Promise.all([
        this.userBalanceRepository.create(userBalance, { session }),
        this.userBalanceHistoryRespository.create(newUserBalanceHistory, { session })
      ]);

      // All action success then commit transaction
      await session.commitTransaction();
    } catch (error) {
      this.logger.error("WithdrawMoneyFailed", JSON.stringify({ user, withdrawMoneyDto, userBalance }));
      await session.abortTransaction();
    }
  }
}
