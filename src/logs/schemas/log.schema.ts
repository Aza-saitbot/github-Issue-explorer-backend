import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop()
  ip: string;

  @Prop()
  dt: string;

  @Prop()
  type: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
