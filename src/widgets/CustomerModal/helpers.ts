import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getCountyList } from 'requests/county';
import { getPostCodeList } from 'requests/postcode';
import { getTownList } from 'requests/town';

export enum ECustomerModalTypes {
  add = 'add',
  edit = 'edit',
}

export const getPostCodeOptions = async (inputValue: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getPostCodeList(token as string, {
      criteria: {
        postCode: inputValue,
      },
      page: { pageNumber: 0, pageSize: 50 },
    });
    return data.data.content.map((postcode) => ({
      value: postcode.id,
      label: postcode.postcode,
    }));
  } catch (e) {
    console.error(e);

    return [];
  }
};

export const getTownOptions = async (inputValue: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getTownList(token as string, {
      criteria: {
        name: inputValue,
      },
      page: { pageNumber: 0, pageSize: 50 },
    });
    return data.data.content.map((town) => ({
      value: town.id,
      label: town.name,
    }));
  } catch (e) {
    console.error(e);

    return [];
  }
};

export const getCountyOptions = async (inputValue: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getCountyList(token as string, {
      criteria: {
        name: inputValue,
      },
      page: { pageNumber: 0, pageSize: 50 },
    });
    return data.data.content.map((county) => ({
      value: county.id,
      label: county.name,
    }));
  } catch (e) {
    console.error(e);

    return [];
  }
};
