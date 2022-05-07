import { createSlice } from '@reduxjs/toolkit';
import { setVehiclesAction } from './actions';
import { IDashboardVehiclesState } from './types';

const initialState: IDashboardVehiclesState = {
  vehicles: null,
};

export const dashboardVehiclesSlice = createSlice({
  name: 'dashboardVehicles',
  initialState,
  reducers: {
    setVehicles: setVehiclesAction,
  },
});

export const { setVehicles } = dashboardVehiclesSlice.actions;
export const dashboardVehiclesReducer = dashboardVehiclesSlice.reducer;
