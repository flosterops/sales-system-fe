import { fetchUsers, IFetchUserBody } from 'requests/users';
import { useEffect, useState } from 'react';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { isResponseError } from 'models/guards';
import { useDebounce } from 'helpers/useDebounce';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<ISelectOptionsModel[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  const debouncedFilter = useDebounce(filter, 1000);

  useEffect(() => {
    const loadUsers = async () => {
      const body: IFetchUserBody = {
        criteria: {},
        page: {
          pageNumber: 0,
          pageSize: 10,
        },
      };

      try {
        const data = await fetchUsers(body);
        if (!isResponseError(data)) {
          return setUsers(
            data.data.content.map((item) => ({
              value: item.id,
              label: `${item.firstName} ${item.lastName}`,
            })) || [],
          );
        }
        setUsers([]);
        return setCount(0);
      } catch (e: any) {
        console.warn(`fetchUsers request error: ${e.message}`);
        setUsers([]);
        return setCount(0);
      }
    };

    loadUsers();
  }, [count, debouncedFilter, trigger]);

  return { count, users, setFilter, setTrigger };
};
