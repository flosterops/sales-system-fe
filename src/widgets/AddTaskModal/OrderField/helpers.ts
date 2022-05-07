import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getWebsiteUserOrders } from 'requests/website-user';

export const getClientOrdersList = async (clientId: string) => {
  try {
    const token = Cookies.get(ECookiesTypes.accessToken);
    const data = await getWebsiteUserOrders(token as string, +clientId);
    return data.data.map((userOrder) => ({
      value: userOrder.id,
      label: String(userOrder.id),
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
