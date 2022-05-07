import { ITask } from 'models/task';

export interface IDashboardTask {
  tasks: ITask[] | null;
}
