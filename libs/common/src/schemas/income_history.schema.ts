import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class IncomeHistory extends AbstractDocument {
  @Prop()
  user_email: string;

  @Prop()
  daily_income: number;

  @Prop()
  total_income: number;

  @Prop()
  user_salary_config_id: string;
}

export const IncomeHistorySchema = SchemaFactory.createForClass(IncomeHistory);
