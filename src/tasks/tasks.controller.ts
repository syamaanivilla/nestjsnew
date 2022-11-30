import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  //Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task/task.model';
//import { CreateTaskDto } from './dto/create-task.dto';
//import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
//import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post()
  async addTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: TaskStatus,
  ) {
    const gid = await this.tasksService.insertTask(title, description, status);
    return { id: gid };
  }
  @Get()
  async getAllTasks() {
    const tasks = await this.tasksService.getAllTasks();
    return tasks;
  }

  // @Post()
  // async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  //   return await this.tasksService.createTask(createTaskDto);
  //   // return await this.tasksService.createTask();
  // }
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);
    return task;
  }
  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
    return null;
  }
  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: TaskStatus,
  ) {
    await this.tasksService.updateTask(id, title, description, status);
    return null;
  }
}
