import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  versionKey: false,
  collection: 'user_salary_configurations',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class UserSalaryConfiguration extends AbstractDocument {
  @Prop()
  company_id: string;

  @Prop()
  user_id: string;

  @Prop()
  number_working_day: number;

  @Prop()
  base_salary: number;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const UserSalaryConfigurationSchema = SchemaFactory.createForClass(UserSalaryConfiguration);

// Add index for user_id field
UserSalaryConfigurationSchema.index({ user_id: 1 }, { unique: true });