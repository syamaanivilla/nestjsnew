import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Taskschema } from './task/scheemas/task.scheema/task.scheema';
import { AppModule } from 'src/app.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: Taskschema }])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
