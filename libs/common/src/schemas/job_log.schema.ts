import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../database/abstract.schema';
import { getUnixTime } from 'date-fns';

@Schema({
  versionKey: false,
  collection: 'job_logs',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => getUnixTime(new Date()),
  },
})
export class JobLog extends AbstractDocument {
  @Prop()
  job_key: string;

  @Prop()
  day_caculate: number;

  @Prop()
  job_state: JobState;

  @Prop()
  created_at?: number;

  @Prop()
  updated_at?: number;
}

export const JobLogSchema = SchemaFactory.createForClass(JobLog);

export enum JobState {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}