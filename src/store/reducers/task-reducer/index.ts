import { ActionReducerMapBuilder, createSlice, Draft } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { IError } from 'models/requests';
import { listScheduledTasksForToday } from './actions';
import { ITaskState, ITaskDetail } from './types';

const initialState = {
  loading: false,
  tasks: [],
  error: null,
  newTaskId: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<ITaskState>>) => {
    builder.addCase(
      listScheduledTasksForToday.fulfilled,
      (state: Draft<ITaskState>, action) => {
        state.loading = false;
        state.tasks = action.payload as ITaskDetail[] | [];
        state.error = null;
      },
    );
    builder.addCase(listScheduledTasksForToday.pending, (state: Draft<ITaskState>) => {
      state.loading = true;
    });
    builder.addCase(
      listScheduledTasksForToday.rejected,
      (state: Draft<ITaskState>, action) => {
        state.loading = false;
        state.tasks = [];
        if (action.payload) {
          state.error = (action.payload as IError).error;
        } else {
          state.error = 'Serialized error';
        }
      },
    );
  },
});

export const taskReducer = taskSlice.reducer;
