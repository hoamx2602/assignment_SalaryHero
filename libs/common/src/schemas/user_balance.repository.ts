import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserBalance } from './user_balance.schema';

@Injectable()
export class UserBalanceRepository extends AbstractRepository<UserBalance> {
  protected readonly logger = new Logger(UserBalanceRepository.name);

  constructor(
    @InjectModel(UserBalance.name) userBalanceModel: Model<UserBalance>,
    @InjectConnection() connection: Connection,
  ) {
    super(userBalanceModel, connection);
  }

  async getUserBalance(email: string): Promise<UserBalance> {
    const userBalance = await this.model.findOne({ email }, {}, { lean: true });

    if (!userBalance) {
      this.logger.warn('User not have the own balance', email);
      throw new NotFoundException('User not have the own balance');
    }

    return userBalance;
  }
}
