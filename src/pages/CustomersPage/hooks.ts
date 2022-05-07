import { ICustomerFilters, ICustomerSearch } from 'models/customer';
import { ISortOptions } from 'models/table';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getCustomers } from 'requests/customer';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';

export interface IUseFetchCustomerOptions {
  currentPage: number;
  filters?: ICustomerFilters;
  sort: ISortOptions;
}

export const useFetchCustomers = (options: IUseFetchCustomerOptions) => {
  const { currentPage, sort, filters } = options;
  const [customers, setCustomers] = useState<ICustomerSearch[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCustomers = useCallback(async () => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    const body: any = {
      criteria: {},
      page: {
        pageNumber: currentPage,
        pageSize: 10,
      },
    };

    if (sort) {
      switch (sort.property) {
        case 'fullName':
          body.page.sort = {
            orders: [
              {
                property: 'firstname',
                direction: sort.direction,
              },
              {
                property: 'lastname',
                direction: sort.direction,
              },
            ],
          };
          break;
        case 'address':
          body.page.sort = {
            orders: [
              {
                property: 'address1',
                direction: sort.direction,
              },
            ],
          };
          break;
        case 'phone':
          body.page.sort = {
            orders: [
              {
                property: 'mobilePhone',
                direction: sort.direction,
              },
            ],
          };
          break;
        default:
          body.page.sort = {
            orders: [sort],
          };
          break;
      }
    }

    const criteria = {} as any;
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (!filters[key as keyof ICustomerFilters]) {
          return;
        }

        switch (key) {
          case 'address':
            criteria.address1 = filters[key];
            break;
          default:
            criteria[key] = filters[key as keyof ICustomerFilters];
            break;
        }
      });
    }

    body.criteria = criteria;

    const data = await getCustomers(token || '', body);

    if (!isResponseError(data)) {
      setCustomers(data.data.content as ICustomerSearch[]);
      setTotalPages(data.data.totalPages);
    }
  }, [currentPage, sort, filters]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, totalPages, fetchCustomers };
};
