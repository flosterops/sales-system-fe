import { IAuthResponse } from 'models/user';

export const getAvatarText = (user: IAuthResponse | null): string => {
  if (!user) {
    return '';
  }

  return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
};
