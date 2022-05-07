import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getWebsiteUserOrders } from 'requests/website-user';
import { isResponseError } from 'models/guards';
import { IWebsiteUserOrder } from 'models/webiste-user';
import { getVehicle, getVehicleImages } from 'requests/vehicles';
import { ImagesTypes } from 'models/vehicles';
import { getImagePath } from 'helpers/images';

export interface ICustomerOrder extends IWebsiteUserOrder {
  image: string;
  name: string;
  imageAlt: string;
}

export const getVehicleImage = async (vehicleId: number) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  try {
    const data = await getVehicleImages(token, vehicleId);
    return {
      src: getImagePath(data.data[ImagesTypes.IMAGES][0].fileName),
      alt: data.data[ImagesTypes.IMAGES][0].title,
    };
  } catch (e: any) {
    return { src: '', alt: '' };
  }
};

export const useFetchCustomerOrders = (id: string) => {
  const [orders, setOrders] = useState<ICustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadOrders = async (): Promise<void> => {
      setLoading(true);
      try {
        const token = Cookies.get(ECookiesTypes.accessToken) || '';
        const data = await getWebsiteUserOrders(token, Number(id));

        if (isResponseError(data)) {
          return setOrders([]);
        }

        const mappedData = await Promise.all(
          data.data.map(async (order: IWebsiteUserOrder): Promise<ICustomerOrder> => {
            const [image, details] = await Promise.all([
              getVehicleImage(order.vehicleId),
              getVehicle(token, order.vehicleId),
            ]);
            return {
              ...order,
              image: image.src,
              name: `${details.data.make.name} ${details.data.model.name}`,
              imageAlt: image.alt as string,
            };
          }),
        );
        return setOrders(mappedData);
      } catch (e: any) {
        console.error(e.message);
        return setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [id]);

  return { orders, loading };
};
