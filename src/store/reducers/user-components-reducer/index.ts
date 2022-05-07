import { createSlice } from '@reduxjs/toolkit';
import { setUserComponentsAction } from './actions';

const initialState = {
  components: [],
};

export const userComponentsSlice = createSlice({
  name: 'userComponents',
  initialState,
  reducers: {
    setUserComponents: setUserComponentsAction,
  },
});

export const { setUserComponents } = userComponentsSlice.actions;
export const userComponentsReducer = userComponentsSlice.reducer;
