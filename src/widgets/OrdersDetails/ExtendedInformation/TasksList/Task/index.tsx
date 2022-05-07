import React from 'react';
import { ITask as TaskType, ETaskStatuses } from 'models/task';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { format } from 'date-fns';
import { TaskContent, TaskWrapper } from './styles';

interface ITask {
  task: TaskType;
}

const Task = ({ task }: ITask) => {
  const isResolved = task.status === ETaskStatuses.RESOLVED;

  const renderTaskDetails = () => {
    if (isResolved && task.resolvedTime) {
      return `FINISHED ${format(new Date(task.resolvedTime), 'dd/MM/yyyy hh:mm a')}`;
    }
    if (!isResolved && task.scheduledToTime) {
      return `TASK RESCHEDULED ${format(
        new Date(task.scheduledToTime),
        'dd/MM/yyyy hh:mm a',
      )}`;
    }
    return '';
  };

  return (
    <TaskWrapper isPositive={isResolved}>
      <TaskContent width={36.5}>
        <Icon color={colors.white} type={isResolved ? EIconTypes.check : EIconTypes.times} />
        {task.taskDisplayName}
      </TaskContent>
      <TaskContent width={27}>
        CREATED {format(new Date(task.createdOn), 'dd/MM/yyyy hh:mm a')}
      </TaskContent>
      <TaskContent width={36.5}>{renderTaskDetails()}</TaskContent>
    </TaskWrapper>
  );
};

export { Task };
