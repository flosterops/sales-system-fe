import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import {
  EGadgetTypes,
  IDashboardComponentsResponse,
  IAllowedDashboardComponentResponse,
  IUserComponentDeleteResponse,
} from 'models/gadget';
import { Dispatch } from 'redux';
import { mapDashboardComponentsToState, mapGadgetsToState } from 'helpers/gadget';
import { setGadgets } from 'store/reducers/gadgets-allowed-reducer';
import { setUserComponents } from 'store/reducers/user-components-reducer';

export const addComponent = async (
  token: string,
  componentType: EGadgetTypes,
  dashboardComponentOrder: number,
): Promise<TResponse<boolean>> => {
  const { data } = await request.dashboard.post<TResponse<any>>(
    urls.addDashboardComponent(),
    {
      componentType,
      dashboardComponentOrder,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return !isResponseError(data);
};

export const loadAllowedComponents = async (token: string, dispatch: Dispatch<any>) => {
  const { data } = await request.dashboard.get<TResponse<IAllowedDashboardComponentResponse>>(
    urls.allowedDashboardComponents(),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    const dataToDispatch = mapGadgetsToState(data.data);
    dispatch(setGadgets(dataToDispatch));
  }
};

export const loadUserDashboardComponents = async (
  token: string,
  userId: string,
  dispatch: Dispatch<any>,
) => {
  const { data } = await request.dashboard.get<TResponse<IDashboardComponentsResponse>>(
    urls.userDashboardComponents(userId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    const dataToDispatch = mapDashboardComponentsToState(data.data);
    dispatch(setUserComponents(dataToDispatch));
  }

  return data;
};

export const deleteUserComponent = async (token: string, componentId: string) => {
  const { data } = await request.dashboard.delete<TResponse<IUserComponentDeleteResponse>>(
    urls.deleteUserDashboardComponent(componentId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return !isResponseError(data);
};
