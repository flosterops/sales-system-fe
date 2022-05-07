import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';
import { ISortOptions } from 'models/table';
import { getVehicles } from 'requests/vehicles';
import { IVehicleDashboard } from 'models/vehicles';
import { isEmptyObject } from 'helpers/is-empty-object';
import { IVehicleFilters } from './types';

export interface IUseFetchTaskOptions {
  currentPage: number;
  filters?: IVehicleFilters;
  sort: ISortOptions;
}

export const useFetchVehicles = (options: IUseFetchTaskOptions) => {
  const { currentPage, sort, filters } = options;
  const [vehicles, setVehicles] = useState<IVehicleDashboard[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = Cookies.get(ECookiesTypes.accessToken);

      const body: any = {
        criteria: {},
        page: {
          pageNumber: currentPage,
          pageSize: 10,
        },
      };

      if (sort) {
        if (sort.property === 'status') {
          body.page.sort = {
            orders: [
              { property: 'sold', direction: sort.direction === 'DESC' ? 'ASC' : 'DESC' },
              {
                property: 'advertise',
                direction: sort.direction === 'ASC' ? 'ASC' : 'DESC',
              },
            ],
          };
        } else {
          body.page.sort = {
            orders: [sort],
          };
        }
      }

      const criteria = {} as any;

      if (filters) {
        criteria.price = {};
        criteria.mileage = {};

        Object.keys(filters).forEach((key) => {
          if (!filters[key as keyof IVehicleFilters]) {
            return;
          }

          switch (key) {
            case 'advertised':
              criteria.advertised = filters[key];
              criteria.sold = false;
              break;
            case 'priceMin':
              criteria.price.from = filters[key];
              break;
            case 'priceMax':
              criteria.price.to = filters[key];
              break;
            case 'mileageMin':
              criteria.mileage.from = filters[key];
              break;
            case 'mileageMax':
              criteria.mileage.to = filters[key];
              break;
            case 'registration':
              criteria.vrm = filters[key];
              break;
            case 'modelVariant':
              criteria.variant = filters[key];
              break;
            default:
              criteria[key] = filters[key as keyof IVehicleFilters];
          }
        });

        if (isEmptyObject(criteria.price)) {
          delete criteria.price;
        }

        if (isEmptyObject(criteria.mileage)) {
          delete criteria.mileage;
        }
      }

      body.criteria = criteria;

      const data = await getVehicles(token || '', body);

      if (!isResponseError(data)) {
        setVehicles(data.data.content as IVehicleDashboard[]);
        setTotalPages(data.data.totalPages);
      }
    };

    fetchVehicles();
  }, [currentPage, sort, filters]);

  return { vehicles, totalPages };
};
