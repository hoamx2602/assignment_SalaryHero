import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  versionKey: false,
  collection: 'user_balance_histories',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class UserBalanceHistory extends AbstractDocument {
  @Prop()
  user_id: string;

  @Prop()
  date: string;

  @Prop()
  action_type: ActionType;

  @Prop()
  amount: number;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const UserBalanceHistorySchema = SchemaFactory.createForClass(UserBalanceHistory);

export enum ActionType {
  RECEIVE = 'receive',
  WITHDRAW = 'withdraw',
}

// Add index for user_id field
UserBalanceHistorySchema.index({ user_id: 1 }, { unique: true });
