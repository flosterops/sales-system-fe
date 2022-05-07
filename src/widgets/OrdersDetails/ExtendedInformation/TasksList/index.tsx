import { ITask } from 'models/task';
import React from 'react';
import { TasksListWrapper } from './styles';
import { Task } from './Task';

interface ITasksList {
  tasks: ITask[];
}

const TasksList = ({ tasks }: ITasksList) => (
  <TasksListWrapper>
    {tasks.map((task) => (
      <Task key={task.id} task={task} />
    ))}
  </TasksListWrapper>
);

export { TasksList };
