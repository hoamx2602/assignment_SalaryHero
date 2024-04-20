import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IncomeHistory } from './income_history.schema';

@Injectable()
export class IncomeHistoryRepository extends AbstractRepository<IncomeHistory> {
  protected readonly logger = new Logger(IncomeHistoryRepository.name);

  constructor(
    @InjectModel(IncomeHistory.name)
    incomeHistoryModel: Model<IncomeHistory>,
    @InjectConnection() connection: Connection,
  ) {
    super(incomeHistoryModel, connection);
  }
}
