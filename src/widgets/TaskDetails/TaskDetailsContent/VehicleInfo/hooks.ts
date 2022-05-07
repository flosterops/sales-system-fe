import { useEffect, useState } from 'react';
import { IVehicle, IVehicleImages, IVehicleResponse } from 'models/vehicles';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getOrderVehicleById } from 'requests/orders';
import { getVehicleImages } from 'requests/vehicles';
import { isResponseError } from 'models/guards';
import { setImagesPaths } from 'helpers/images';

export const useVehicleDetails = (orderId?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState<IVehicle>();
  const [vehicleImages, setVehicleImages] = useState<IVehicleImages>();

  useEffect(() => {
    (async function getTaskInfo() {
      setIsLoading(true);
      const token = Cookies.get(ECookiesTypes.accessToken);

      if (!token) {
        return;
      }

      try {
        const vehicleResponse = await getOrderVehicleById(token, orderId as number);
        const vehicleImageResponse = await getVehicleImages(
          token,
          (vehicleResponse as IVehicleResponse).data.id,
        );

        if (!isResponseError(vehicleResponse) && !isResponseError(vehicleImageResponse)) {
          setVehicleDetails(vehicleResponse.data);
          setImagesPaths(vehicleImageResponse.data);

          setVehicleImages(vehicleImageResponse.data);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, [orderId]);

  return {
    isLoading,
    vehicleDetails,
    vehicleImages,
  };
};
