import { ITask } from 'models/task';
import { IDashboardTask } from './types';

export const setTasksAction = (state: IDashboardTask, action: { payload: ITask[] }) => {
  state.tasks = action.payload;
};
