import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  versionKey: false,
  collection: 'user_balances',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class UserBalance extends AbstractDocument {
  @Prop()
  user_email: string;

  @Prop()
  available_balance: number;

  @Prop()
  pending_balance: number;

  @Prop()
  is_active: boolean;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const UserBalanceSchema = SchemaFactory.createForClass(UserBalance);
