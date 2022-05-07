import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import RootReducer from './reducers';

export type TStore = ReturnType<typeof RootReducer>;

const prepareStore = (preloadedState: TStore) =>
  configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
    preloadedState,
  });

export const store = prepareStore({
  user: {
    accessToken: Cookies.get(ECookiesTypes.accessToken) || null,
    refreshToken: Cookies.get(ECookiesTypes.refreshToken) || null,
    isRefreshTokenLoading: false,
    user: {},
    error: null,
    loading: true,
  },
} as TStore);
