import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { ICustomerRequestData, ICustomerSearchResponse } from 'models/customer';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import { Dispatch } from 'redux';
import { setCustomers } from 'store/reducers/dashboard-customers-reducer';

export const getCustomers = async (token: string, requestData: ICustomerRequestData) => {
  const { data } = await request.dashboard.post<TResponse<ICustomerSearchResponse>>(
    urls.customersSearch(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    return data;
  }

  return data;
};

export const loadCustomerDashboardDispatch = async (
  token: string,
  requestData: ICustomerRequestData,
  dispatch: Dispatch,
) => {
  const { data } = await request.dashboard.post<TResponse<ICustomerSearchResponse>>(
    urls.customersSearch(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    dispatch(setCustomers(data.data.content));
  }
};
