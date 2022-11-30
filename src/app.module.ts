import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
//import { TaskModel } from './tasks/task/task.model';
@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
      'mongodb+srv://Syamaanivilla:syama1997@node.piiwe4l.mongodb.net/syama?retryWrites=true&w=majority',
    ),
  ],
  // controllers: [TasksController],
  // providers: [TasksService],
})
export class AppModule {}
//////class for using decorators
