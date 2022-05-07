import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'requests/login';
import { isResponseError } from 'models/guards';
import { ECookiesTypes } from 'models/cookies';
import { authUser } from 'store/reducers/user-reducer/actions';
import { TStore } from 'store';
import { EButtonsVariants } from 'models/button';
import { setCookie } from 'helpers/set-cookie';
import { StyledLoginButtonDev } from './styles';

const LoginButtonDev = (): ReactElement => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: TStore) => ({ isAuth: !!state.user.user }));

  const handleLogin = async (): Promise<void> => {
    const data = await login({ email: 'admin@sensilabs.pl', password: '1CupOfTeaIsFine' });
    if (!isResponseError(data)) {
      setCookie(ECookiesTypes.accessToken, data.accessToken);
      setCookie(ECookiesTypes.refreshToken, data.refreshToken);
      dispatch(authUser());
    }
  };

  return (
    <StyledLoginButtonDev
      variant={isAuth ? EButtonsVariants.primary : EButtonsVariants.danger}
      onClick={handleLogin}
    >
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Login. Is Authed "{String(isAuth)}"
    </StyledLoginButtonDev>
  );
};

export { LoginButtonDev };
