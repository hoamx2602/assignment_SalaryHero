import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  versionKey: false,
  collection: 'companies',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class Company extends AbstractDocument {
  @Prop()
  company_name: string;

  @Prop()
  address: string;

  @Prop()
  timezone: number;

  @Prop()
  description: string;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
