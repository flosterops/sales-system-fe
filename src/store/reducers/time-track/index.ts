import { createSlice } from '@reduxjs/toolkit';
import { setTimeTrackAction } from './actions';
import { IDashboardTimeTrackState } from './types';

const initialState: IDashboardTimeTrackState = {
  list: null,
};

export const timeTrackReducerSlice = createSlice({
  name: 'dashboardTimeTrack',
  initialState,
  reducers: {
    setTimeTrack: setTimeTrackAction,
  },
});

export const { setTimeTrack } = timeTrackReducerSlice.actions;
export const timeTrackReducer = timeTrackReducerSlice.reducer;
