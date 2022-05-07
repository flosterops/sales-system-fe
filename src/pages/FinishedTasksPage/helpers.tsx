// import React, { SetStateAction, Dispatch } from 'react';
import { format } from 'date-fns';
import { ITableColumns } from 'models/table';
// import { colors } from 'styles/colors';
// import { EInputTypes } from 'models/forms';
// import { DatePicker } from 'widgets/DatePicker';
// import { FilterInput } from 'widgets/Table/FilterFields/FilterInput';

const FINISHED_TASKS = 'finished-tasks';
export const finishedTasksColumns: ITableColumns[] = [
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b911',
    key: 'taskId',
    title: 'ID',
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b912',
    key: 'taskName',
    title: 'Task name',
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b913',
    key: 'vrm',
    title: 'VRM',
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b914',
    key: 'resolvedBy',
    title: 'Resolved by',
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b915',
    key: 'resolvedDate',
    title: 'Resolved date',
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b916',
    key: 'notes',
    title: 'Notes',
  },
];

// ToDo: add filters

// export const getFilterableFinishedTasksColumns = (
//   setFilters: Dispatch<SetStateAction<Record<string, string | Date | null>>>,
// ): ITableColumns[] => [
//   {
//     id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b911',
//     key: 'taskId',
//     title: 'ID',
//     filterRender: () => (
//       <FilterInput
//         color={colors.primary}
//         onChange={(value) => {
//           setFilters((prev) => ({
//             ...prev,
//             taskId: value,
//           }));
//         }}
//         name="taskId"
//         placeholder="ID"
//         type={EInputTypes.search}
//       />
//     ),
//   },
//   {
//     id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b912',
//     key: 'taskName',
//     title: 'Task name',
//     filterRender: () => (
//       <FilterInput
//         color={colors.primary}
//         onChange={(value) => {
//           setFilters((prev) => ({
//             ...prev,
//             taskName: value,
//           }));
//         }}
//         name="taskName"
//         placeholder="Task name"
//         type={EInputTypes.search}
//       />
//     ),
//   },
//   {
//     id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b913',
//     key: 'vrm',
//     title: 'VRM',
//     filterRender: () => (
//       <FilterInput
//         color={colors.primary}
//         onChange={(value) => {
//           setFilters((prev) => ({
//             ...prev,
//             vrm: value,
//           }));
//         }}
//         name="vrm"
//         placeholder="VRM"
//         type={EInputTypes.search}
//       />
//     ),
//   },
//   {
//     id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b914',
//     key: 'resolvedBy',
//     title: 'Resolved by',
//     filterRender: () => (
//       <FilterInput
//         color={colors.primary}
//         onChange={(value) => {
//           setFilters((prev) => ({
//             ...prev,
//             resolvedBy: value,
//           }));
//         }}
//         name="resolvedBy"
//         placeholder="Resolved by"
//         type={EInputTypes.search}
//       />
//     ),
//   },
//   {
//     id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b915',
//     key: 'resolvedDate',
//     title: 'Resolved date',
//     filterRender: () => (
//       <DatePicker
//         className="filter-input"
//         color={colors.primary}
//         onChange={(value: Date) => {
//           setFilters((prev) => ({
//             ...prev,
//             resolvedDate: value,
//           }));
//         }}
//       />
//     ),
//   },
//   {
//     id: 'db74e75b-7fed-4fe4-8b84-9e6da3c4b916',
//     key: 'notes',
//     title: 'Notes',
//     filterRender: () => (
//       <FilterInput
//         color={colors.primary}
//         onChange={(value) => {
//           setFilters((prev) => ({
//             ...prev,
//             notes: value,
//           }));
//         }}
//         name="notes"
//         placeholder="Notes"
//         type={EInputTypes.search}
//       />
//     ),
//   },
// ];

// ToDo: add interface for request response
export const mapFinishedTasks = (data: any) =>
  data.map((task: any, key: number) => ({
    id: `${FINISHED_TASKS}-${task.id}`,
    taskId: (key + 1).toString(),
    taskName: task.taskDisplayName,
    vrm: task.vrm || '',
    resolvedBy: task.resolvedBy && `${task.resolvedBy.firstName} ${task.resolvedBy.lastName}`,
    resolvedDate: format(new Date(task.resolvedTime as string), 'dd/MM/yyyy hh:mm aa'),
    notes: task.notes || '',
  }));
