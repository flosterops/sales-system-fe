import { createSlice } from '@reduxjs/toolkit';
import { setCustomersAction } from './actions';
import { IDashboardCustomersState } from './types';

const initialState: IDashboardCustomersState = {
  customers: null,
};

export const dashboardCustomersSlice = createSlice({
  name: 'dashboardCustomers',
  initialState,
  reducers: {
    setCustomers: setCustomersAction,
  },
});

export const { setCustomers } = dashboardCustomersSlice.actions;
export const dashboardCustomersReducer = dashboardCustomersSlice.reducer;
