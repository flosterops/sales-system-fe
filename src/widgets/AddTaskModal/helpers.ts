import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getUsersByPhrase } from 'requests/user';
import { getVehicles } from 'requests/vehicles';
import { getWebsiteUserByPhrase, getWebsiteUserDetails } from 'requests/website-user';
import { isResponseError } from '../../models/guards';

export const getWebSiteUserAsOption = async (id: string) => {
  try {
    const data = await getWebsiteUserDetails(Number(id));

    if (isResponseError(data)) {
      return [{ value: '', label: '' }];
    }

    return [
      {
        value: data.data.id,
        label: `${data.data.id} - ${data.data.firstname} ${data.data.lastname}`,
      },
    ];
  } catch (e) {
    console.error(e);
    return [{ value: '', label: '' }];
  }
};

export const getClientIdList = async (inputValue: string) => {
  try {
    if (!Number.isNaN(Number(inputValue))) {
      const data = await getWebsiteUserDetails(Number(inputValue));

      if (isResponseError(data)) {
        return [{ value: '', label: '' }];
      }

      return [
        {
          value: data.data.id,
          label: `${data.data.id} - ${data.data.firstname} ${data.data.lastname}`,
        },
      ];
    }
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getWebsiteUserByPhrase(token as string, {
      criteria: {
        phrase: inputValue,
      },
      page: { pageNumber: 0, pageSize: 50 },
    });
    return data.data.content.map((websiteUser) => ({
      value: websiteUser.id,
      label: `${websiteUser.id} - ${websiteUser.firstname} ${websiteUser.lastname}`,
    }));
  } catch (e) {
    console.error(e);

    return [];
  }
};

export const getVrmList = async (inputValue: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getVehicles(token as string, {
      criteria: {
        vrm: inputValue,
      },
      page: { pageNumber: 0, pageSize: 50 },
    });
    return data.data.content.map((vehicle) => ({
      value: vehicle.registration,
      label: `${vehicle.registration}`,
    }));
  } catch (e) {
    console.error(e);

    return [];
  }
};

export const getAssignUserList = async (inputValue: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getUsersByPhrase(token as string, {
      criteria: {
        phrase: inputValue,
      },
      page: { pageNumber: 0, pageSize: 50 },
    });
    return data.data.content.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }));
  } catch (e) {
    console.error(e);

    return [];
  }
};
