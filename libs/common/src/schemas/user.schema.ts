import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: UserRole;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

export enum UserRole {
  EMPLOYEE = 'employee',
  WORKER = 'worker',
}
