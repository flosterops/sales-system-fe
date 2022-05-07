import { IGadgetDashboardComponent } from 'models/gadget';
import { IUserComponentsState } from './types';

export const setUserComponentsAction = (
  state: IUserComponentsState,
  action: { payload: IGadgetDashboardComponent[] },
) => {
  state.components = action.payload;
};
