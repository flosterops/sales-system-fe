import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { deleteUserComponent, loadUserDashboardComponents } from 'requests/component';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'widgets/Modal/context';
import { TStore } from 'store';

export const useRemoveGadget = (id: string) => {
  const { closeModal } = useModal();
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));
  const dispatch = useDispatch();

  return async () => {
    const token = Cookies.get(ECookiesTypes.accessToken);
    if (token && user && id) {
      const status = await deleteUserComponent(token, id);
      if (status) {
        await loadUserDashboardComponents(token, user.id || '', dispatch);
        closeModal();
      }
    }
  };
};
