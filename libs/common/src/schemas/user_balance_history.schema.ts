import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class UserBalanceHistory extends AbstractDocument {
  @Prop()
  user_email: string;

  @Prop()
  date: string;

  @Prop()
  action_type: ActionType;

  @Prop()
  amount: number;
}

export const UserBalanceHistorySchema =
  SchemaFactory.createForClass(UserBalanceHistory);

export enum ActionType {
  RECEIVE = 'receive',
  WITHDRAW = 'withdraw',
}
