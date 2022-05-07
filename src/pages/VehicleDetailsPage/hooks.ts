import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ECookiesTypes } from 'models/cookies';
import {
  getCancelledOrdersCount,
  getInterestCount,
  getVehicle,
  getVehicleImages,
} from 'requests/vehicles';
import { IVehicle, IVehicleImages } from 'models/vehicles';
import { isResponseError } from 'models/guards';
import { setImagesPaths } from 'helpers/images';

export const useFetchVehicle = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<IVehicle | null>();
  const [vehicleImages, setVehicleImages] = useState<IVehicleImages>();
  const [interestCount, setInterestCount] = useState<number>(0);
  const [cancelledOrdersCount, setCancelledOrdersCount] = useState<number>(0);

  useEffect(() => {
    (async function getVehicleDetails() {
      setIsLoading(true);
      const token = Cookies.get(ECookiesTypes.accessToken);

      if (!token || !id) {
        return;
      }

      try {
        const [vehicleResponse, vehicleImageResponse] = await Promise.all([
          getVehicle(token, id),
          getVehicleImages(token, id),
        ]);

        if (!isResponseError(vehicleResponse) && !isResponseError(vehicleImageResponse)) {
          setVehicle(vehicleResponse.data);

          setImagesPaths(vehicleImageResponse.data);
          setVehicleImages(vehicleImageResponse.data);
        }
      } catch (e) {
        setVehicle(null);
        console.error(e);
      }

      try {
        const vehicleInterestCount = await getInterestCount(token, id);
        if (!isResponseError(vehicleInterestCount)) {
          setInterestCount(vehicleInterestCount.data);
        }
      } catch (e) {
        setInterestCount(0);
        console.error(e);
      }

      try {
        const cancelledOrders = await getCancelledOrdersCount(token, id);
        if (!isResponseError(cancelledOrders)) {
          setCancelledOrdersCount(cancelledOrders.data);
        }
      } catch (e) {
        setCancelledOrdersCount(0);
        console.error(e);
      }

      setIsLoading(false);
    })();
  }, [id]);

  return { isLoading, vehicle, vehicleImages, interestCount, cancelledOrdersCount };
};
