import { IDashboardTimeTrack } from 'models/time-track';
import { IDashboardTimeTrackState } from './types';

export const setTimeTrackAction = (
  state: IDashboardTimeTrackState,
  data: { payload: IDashboardTimeTrack[] },
) => {
  state.list = data.payload;
};
