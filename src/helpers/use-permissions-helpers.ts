import { useSelector } from 'react-redux';
import { TStore } from 'store';
import { IAuthResponse } from 'models/user';

export const usePermissionsHelpers = () => {
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));

  const { permissions: userPermissions = [] } = (user || {}) as IAuthResponse;
  const checkPermissions = (permissionsArr: string[] = []): boolean => {
    const setOfUserPermissions = new Set(...userPermissions.map(({ key }) => key));

    return permissionsArr.every((permission) => setOfUserPermissions.has(permission));
  };

  return {
    userPermissions,
    checkPermissions,
  };
};
