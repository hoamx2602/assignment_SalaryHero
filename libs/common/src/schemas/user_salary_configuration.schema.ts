import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class UserSalaryConfiguration extends AbstractDocument {
  @Prop()
  company_id: string;

  @Prop()
  user_email: string;

  @Prop()
  number_working_day: number;

  @Prop()
  base_salary: number;
}

export const UserSalaryConfigurationSchema = SchemaFactory.createForClass(
  UserSalaryConfiguration,
);
