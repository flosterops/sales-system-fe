import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { IError } from 'models/requests';
import { AxiosError } from 'axios';
import { auth } from 'requests/auth';
import { refresh } from 'requests/refresh';
import { ILoginData } from 'models/login-request';
import { ITasksResponse } from 'models/task';
import { IAuthResponse } from 'models/user';
import { setCookie } from 'helpers/set-cookie';
import { isResponseError } from 'models/guards';
import { IUserState } from './types';

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get(ECookiesTypes.refreshToken);
      if (!token) {
        return null;
      }

      const user = await refresh(token);

      if (isResponseError(user)) {
        return window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
      }

      const { accessToken, refreshToken } = user as ILoginData;
      setCookie(ECookiesTypes.accessToken, accessToken);
      setCookie(ECookiesTypes.refreshToken, refreshToken);

      return { accessToken, refreshToken };
    } catch (e: any) {
      const error: AxiosError<IError> = e;
      window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const authUser = createAsyncThunk(
  'user/authUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = Cookies.get(ECookiesTypes.accessToken);
      if (!token) {
        return window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
      }

      const user = await auth(token as string);
      const { data } = user as ITasksResponse;
      return data;
    } catch (e: any) {
      const error: AxiosError<IError> = e;
      if (!error.response) {
        throw e;
      }
      await dispatch(refreshUserToken());
      await dispatch(authUser());

      return rejectWithValue(error.response.data);
    }
  },
);

export const setUserAction = (
  state: IUserState,
  action: { payload: IAuthResponse | null },
) => {
  state.user = action.payload;
};

export const logoutAction = () => {
  setCookie(ECookiesTypes.accessToken, '');
  setCookie(ECookiesTypes.refreshToken, '');
  return {
    accessToken: null,
    refreshToken: null,
    user: null,
    error: '',
    loading: false,
    isRefreshTokenLoading: false,
  };
};
