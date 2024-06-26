import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  versionKey: false,
  collection: 'income_histories',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class IncomeHistory extends AbstractDocument {
  @Prop()
  user_id: string;

  @Prop()
  daily_income: number;

  @Prop()
  total_income: number;

  @Prop()
  processed_date: number;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const IncomeHistorySchema = SchemaFactory.createForClass(IncomeHistory);

// Add index for user_id field
IncomeHistorySchema.index({ user_id: 1 }, { unique: true });