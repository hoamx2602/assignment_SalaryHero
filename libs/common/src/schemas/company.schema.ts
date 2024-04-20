import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class Company extends AbstractDocument {
  @Prop()
  company_name: string;

  @Prop()
  address: string;

  @Prop()
  timezone: number;

  @Prop()
  description: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
