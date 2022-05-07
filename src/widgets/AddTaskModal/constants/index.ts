import { ETaskTypeNames } from 'models/task';

export const TaskTypesArray: {
  value: string;
  label: string;
}[] = Object.entries(ETaskTypeNames).map(([value, label]) => ({ value, label }));
