import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { IGetContactsResponse } from 'models/contact';

export const getListContacts = async (token: string) => {
  const { data } = await request.dashboard.get<IGetContactsResponse>(urls.getContacts(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
