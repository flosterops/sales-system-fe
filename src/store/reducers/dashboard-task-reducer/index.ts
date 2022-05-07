import { createSlice } from '@reduxjs/toolkit';
import { setTasksAction } from './actions';
import { IDashboardTask } from './types';

const initialState: IDashboardTask = {
  tasks: null,
};

export const dashboardTasksSlice = createSlice({
  name: 'dashboardTasks',
  initialState,
  reducers: {
    setTasks: setTasksAction,
  },
});

export const { setTasks } = dashboardTasksSlice.actions;
export const dashboardTasksReducer = dashboardTasksSlice.reducer;
