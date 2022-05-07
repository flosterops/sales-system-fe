import { useState, useEffect } from 'react';
import { IEmailMessage, IEmailMessageListFilters } from 'models/email-message';
import { ISortOptions } from 'models/table';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { listAllEmailMessages } from 'requests/email-message';
import { isResponseError } from 'models/guards';

export interface IUseFetchEnquires {
  currentPage: number;
  filters?: IEmailMessageListFilters;
  sort: ISortOptions;
}

export const useFetchEnquires = (options: IUseFetchEnquires) => {
  const { currentPage, sort, filters } = options;
  const [messages, setMessages] = useState<IEmailMessage[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEmailMessages = async () => {
      const token = Cookies.get(ECookiesTypes.accessToken);

      const body: any = {
        criteria: {},
        page: {
          pageNumber: currentPage,
          pageSize: 10,
        },
      };

      if (sort) {
        body.page.sort = {
          orders: [sort],
        };
      }

      const criteria = {} as any;
      if (filters) {
        Object.keys(filters).forEach((key) => {
          if (!filters[key as keyof IEmailMessageListFilters]) {
            return;
          }

          switch (key) {
            case 'firstname':
              criteria.firstname = filters[key];
              break;
            case 'lastname':
              criteria.lastname = filters[key];
              break;
            case 'phone':
              criteria.phone = filters[key];
              break;
            case 'email':
              criteria.email = filters[key];
              break;
            case 'message':
              criteria.message = filters[key];
              break;
            case 'fullName': {
              criteria.fullName = filters[key];
              break;
            }
            default:
              criteria[key] = filters[key as keyof IEmailMessageListFilters];
          }
        });
      }

      body.criteria = criteria;

      const data = await listAllEmailMessages(token || '', body);

      if (!isResponseError(data)) {
        setMessages(data.data.content as IEmailMessage[]);
        setTotalPages(data.data.totalPages as number);
      }
    };

    fetchEmailMessages();
  }, [currentPage, sort, filters]);

  return { messages, totalPages };
};
