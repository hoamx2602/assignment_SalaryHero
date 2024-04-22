import { Injectable, Logger } from '@nestjs/common';
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

  async getUserBalance(userId: string): Promise<UserBalance> {
    const userBalance = await this.model.findOne({ user_id: userId }, {}, { lean: true });
    return userBalance;
  }
}
