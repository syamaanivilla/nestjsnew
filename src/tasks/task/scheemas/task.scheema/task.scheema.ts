import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from '../../task.model';
export type UserDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ String })
  status: TaskStatus[];
}
export const Taskschema = SchemaFactory.createForClass(Task);
