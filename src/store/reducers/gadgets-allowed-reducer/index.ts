import { createSlice } from '@reduxjs/toolkit';
import { setGadgetsAction } from './actions';

const initialState = {
  gadgets: [],
};

export const gadgetsSlice = createSlice({
  name: 'gadgetsAllowed',
  initialState,
  reducers: {
    setGadgets: setGadgetsAction,
  },
});

export const { setGadgets } = gadgetsSlice.actions;
export const gadgetsAllowedReducer = gadgetsSlice.reducer;
