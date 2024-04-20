import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserBalanceHistory } from './user_balance_history.schema';

@Injectable()
export class UserBalanceHistoryRepository extends AbstractRepository<UserBalanceHistory> {
  protected readonly logger = new Logger(UserBalanceHistoryRepository.name);

  constructor(
    @InjectModel(UserBalanceHistory.name)
    userBalanceHistoryModel: Model<UserBalanceHistory>,
    @InjectConnection() connection: Connection,
  ) {
    super(userBalanceHistoryModel, connection);
  }
}
