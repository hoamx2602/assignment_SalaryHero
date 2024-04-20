import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

export enum UserRole {
  EMPLOYEE = 'employee',
  WORKER = 'worker',
}
