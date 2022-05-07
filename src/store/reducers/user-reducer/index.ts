import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { IAuthResponse } from 'models/user';
import { IError } from 'models/requests';
import { IAuthCookies } from 'models/login-request';
import { authUser, logoutAction, refreshUserToken, setUserAction } from './actions';
import { IUserState } from './types';

const initialState: IUserState = {
  accessToken: Cookies.get(ECookiesTypes.accessToken) || null,
  refreshToken: Cookies.get(ECookiesTypes.refreshToken) || null,
  isRefreshTokenLoading: false,
  user: {
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    permissions: [],
  },
  error: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setUserAction,
    logout: logoutAction,
    setRefreshTokenLoading: (state: Draft<IUserState>, action: PayloadAction<boolean>) => {
      state.isRefreshTokenLoading = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<IUserState>>) => {
    builder.addCase(authUser.fulfilled, (state: Draft<IUserState>, action) => {
      state.loading = false;
      state.user = action.payload as IAuthResponse | null;
    });
    builder.addCase(authUser.pending, (state: Draft<IUserState>) => {
      state.loading = true;
    });
    builder.addCase(authUser.rejected, (state: Draft<IUserState>, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = (action.payload as IError).error;
      } else {
        state.error = 'Serialized error';
      }
      window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
    });

    builder.addCase(refreshUserToken.fulfilled, (state: Draft<IUserState>, action) => {
      state.refreshToken = (action.payload as IAuthCookies).refreshToken;
      state.accessToken = (action.payload as IAuthCookies).accessToken;
    });
    builder.addCase(refreshUserToken.pending, (state: Draft<IUserState>) => {
      state.isRefreshTokenLoading = true;
    });
    builder.addCase(refreshUserToken.rejected, (state: Draft<IUserState>, action) => {
      state.isRefreshTokenLoading = false;
      if (action.payload) {
        state.error = (action.payload as IError).error;
      } else {
        state.error = 'Serialized error';
      }
    });
  },
});

export const { setUser, logout, setRefreshTokenLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;
