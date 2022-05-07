import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getTasks } from 'requests/task';
import { isResponseError } from 'models/guards';
import { useEffect, useState } from 'react';
import { ETaskStatuses, ITask } from 'models/task';
import { ISortOptions } from 'models/table';
import { addHours, addMinutes, formatISO } from 'date-fns';

export interface IUseFetchTaskOptions {
  currentPage: number;
  filters?: Record<string, string | Date | null>;
  sort: ISortOptions;
}

export const useFetchTasks = (options: IUseFetchTaskOptions) => {
  const { currentPage, sort, filters } = options;
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
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

      const criteria: Record<string, string | string[] | Date | null> = {};
      criteria.statuses = [ETaskStatuses.NEW, ETaskStatuses.UNRESOLVED];

      if (filters) {
        Object.keys(filters).forEach((key: string) => {
          if (!filters[key]) {
            return;
          }

          if (key === 'createdOnLt') {
            criteria.createdOnLt = formatISO(
              addMinutes(addHours(new Date(filters.createdOnLt as unknown as Date), 23), 59),
              { format: 'extended' },
            );
            return;
          }

          if (key === 'createdOnGte') {
            criteria.createdOnGte = formatISO(
              new Date(filters.createdOnGte as unknown as Date),
              {
                format: 'extended',
              },
            );
            return;
          }

          criteria[key] = filters[key];
        });
      }

      body.criteria = criteria;

      const data = await getTasks(token || '', body);

      if (!isResponseError(data)) {
        setTasks(data.data.content);
        setTotalPages(data.data.totalPages);
        setPageNumber(data.data.number);
      }
    };

    fetchTasks();
  }, [currentPage, sort, filters, trigger]);

  return { tasks, totalPages, pageNumber, setTrigger };
};
