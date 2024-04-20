import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class UserBalance extends AbstractDocument {
  @Prop()
  user_email: string;

  @Prop()
  available_balance: number;

  @Prop()
  pending_balance: number;

  @Prop()
  is_active: boolean;
}

export const UserBalanceSchema = SchemaFactory.createForClass(UserBalance);
