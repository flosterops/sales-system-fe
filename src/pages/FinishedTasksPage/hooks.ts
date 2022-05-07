import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getListFinishedTasks } from 'requests/task';
import { isResponseError } from 'models/guards';
import { useEffect, useState } from 'react';
import { ITask } from 'models/task';
import { ISortOptions } from 'models/table';
import { mapFinishedTasks } from './helpers';

export interface IUseFetchTaskOptions {
  currentPage: number;
  filters?: Record<string, string | Date | null>;
  sort: ISortOptions;
}

export const useFetchFinishedTasks = (options: IUseFetchTaskOptions) => {
  const { currentPage, sort, filters } = options;
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchFinishedTasks = async () => {
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

      const criteria: Record<string, string | Date | null> = {};

      if (filters) {
        Object.keys(filters).forEach((key: string) => {
          if (!filters[key]) {
            return;
          }
          switch (key) {
            case 'taskId':
              criteria.id = filters[key];
              break;
            case 'taskName':
              criteria.taskType = filters[key];
              break;
            case 'resolvedDate':
              criteria.resolvedTime = filters[key];
              break;
            default:
              criteria[key] = filters[key];
          }
        });
      }

      body.criteria = criteria;

      const data = await getListFinishedTasks(token || '', body);

      if (!isResponseError(data)) {
        setTasks(mapFinishedTasks(data.data.content));
        setTotalPages(data.data.totalPages);
      }
    };

    fetchFinishedTasks();
  }, [currentPage, sort, filters]);

  return { tasks, totalPages };
};
