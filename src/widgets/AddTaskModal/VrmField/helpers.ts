import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getWebsiteUserOrders } from 'requests/website-user';

export const getOrdersVrmList = async (clientId: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getWebsiteUserOrders(token as string, +clientId);
    return data.data.map((userOrder) => ({
      value: userOrder.vrm,
      label: userOrder.vrm,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
