import { IsEnum } from 'class-validator';

import { TaskStatus } from 'src/tasks/task/task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
