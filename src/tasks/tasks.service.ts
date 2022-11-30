import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task/task.model';
//import { v4 as uuid } from 'uuid';
//import { CreateTaskDto } from './dto/create-task.dto';
//import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly TaskModel: Model<Task>) {}
  private tasks: Task[] = [];
  async insertTask(title: string, description: string, status: TaskStatus) {
    const newTask = new this.TaskModel({
      title,
      description,
      status,
    });
    const result = await newTask.save();
    return result.id;
  }
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.TaskModel.find().exec();
    // console.log(result);
    return tasks;
    // return tasks.map((tas) => ({
    //   id: tas.id,
    //   title: tas.title,
    //   description: tas.description,
    //   status: tas.status,
    // }));
  }
  async getTaskById(id: string) {
    const task = await this.findtask(id);
    return task;
  }
  // const found = this.tasks.find((task) => task.id === id);
  // if (!found) {
  //   throw new NotFoundException(`task with id "${id}" not found`);
  // }
  // return found;

  // getTaskWithFilters(filterdto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterdto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => (task.status = status));
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  // createTask(CreateTaskDto: CreateTaskDto): Task {
  //   const { title, description } = CreateTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  async deleteTask(id: string) {
    const result = await this.TaskModel.deleteOne({ _id: id }).exec();
    console.log(result);
  }
  async updateTask(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
  ) {
    const updatetask = await this.findtask(id);
    if (title) {
      updatetask.title = title;
    }
    if (description) {
      updatetask.description = description;
    }
    if (status) {
      updatetask.status = status;
    }
    updatetask.save();
  }

  private async findtask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.TaskModel.findById(id);
    } catch (error) {
      throw new NotFoundException('could not find task');
    }
    // const taskIndex = this.tasks.findIndex(tas => tas.id === id);
    // const task = this.tasks[taskIndex];
    if (!task) {
      throw new NotFoundException('could not find task');
    }
    return task;
  }
}
