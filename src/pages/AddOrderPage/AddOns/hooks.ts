import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getOrderExtras } from 'requests/orders';
import { IOrderExtras, OrderExtrasGroups, OrderExtrasWarranties } from 'models/order-extras';
import { isResponseError } from 'models/guards';
import { ISelectOptionsModel } from 'widgets/Form/Select';

// hardcoded (business decision)
const getWarrantyPrices = (price: number) => ({
  [OrderExtrasWarranties.OneYearWarranty]: price < 20000 ? 299 : 399,
  [OrderExtrasWarranties.TwoYearsWarranty]: price < 20000 ? 449 : 549,
  [OrderExtrasWarranties.ThreeYearsWarranty]: price < 20000 ? 599 : 799,
});

// hardcoded (business decision)
const getPaintProtectionPrice = () => 249;

export const useOrderExtras = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderExtras, setOrderExtras] = useState<IOrderExtras[]>([]);

  useEffect(() => {
    (async function getOrderExtrasData() {
      setIsLoading(true);

      const token = Cookies.get(ECookiesTypes.accessToken);

      if (!token) {
        return;
      }

      try {
        const orderExtrasResponse = await getOrderExtras(token);
        if (!isResponseError(orderExtrasResponse)) {
          setOrderExtras(orderExtrasResponse.data);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, []);

  const getExtrasByGroup = (groupName: OrderExtrasGroups): ISelectOptionsModel[] => [
    { value: '', label: 'No option' },
    ...orderExtras
      ?.filter((extras) => extras.orderExtrasGroupName === groupName)
      .map((extras) => ({ value: extras.orderExtraId, label: extras.name })),
  ];

  const findExtrasById = (id: number): IOrderExtras | null => {
    const filteredExtras = orderExtras.filter((extras) => extras.orderExtraId === id);
    return filteredExtras ? filteredExtras[0] : null;
  };

  const getWarrantyPrice = (
    orderExtraId: number,
    vehiclePrice: number | null | undefined,
  ): number | null => {
    if (!vehiclePrice) {
      return null;
    }
    const extras = findExtrasById(orderExtraId);
    if (extras) {
      const prices = getWarrantyPrices(vehiclePrice);
      if (Object.prototype.hasOwnProperty.call(prices, extras.systemName)) {
        // @ts-ignore
        return prices[extras.systemName];
      }
    }
    return null;
  };

  const getExtras = (): { [key: string]: IOrderExtras } =>
    orderExtras.reduce((o, item) => ({ ...o, [item.orderExtraId]: item }), {});

  return { isLoading, getExtras, getExtrasByGroup, getWarrantyPrice, getPaintProtectionPrice };
};
