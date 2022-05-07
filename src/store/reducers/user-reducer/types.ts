import { IAuthResponse } from 'models/user';

export interface IUserState {
  accessToken: string | null;
  refreshToken: string | null;
  user: IAuthResponse | null;
  error: string | null;
  loading: boolean;
  isRefreshTokenLoading: boolean;
}
