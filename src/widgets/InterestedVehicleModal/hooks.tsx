import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';
import { IInterestData } from 'models/vehicles';
import { useEffect, useState } from 'react';
import { getInterest } from 'requests/vehicles';

export const useFetchVehicleInterests = (id: number) => {
  const token = Cookies.get(ECookiesTypes.accessToken);

  const [data, setData] = useState<IInterestData[]>([]);
  const [vehicleName, setVehicleName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadApps = async () => {
      try {
        if (token && id) {
          const result = await getInterest(token, id);

          if (isResponseError(data)) {
            return setData([]);
          }

          if (result.data.length > 0) {
            const vehicle = result?.data[0]?.vehicle;
            if (vehicle) {
              setVehicleName(`${vehicle.make.name} ${vehicle.model.name}`);
            }
          }
          return setData(result.data);
        }
        return setData([]);
      } catch (e: any) {
        return setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, vehicleName, loading };
};
