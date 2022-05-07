import { useEffect, useState } from 'react';
import { getTaskCounters, ITaskCounters } from 'requests/task';
import { isResponseError } from 'models/guards';

export const useTaskCounter = (): ITaskCounters => {
  const [counters, setCounters] = useState<ITaskCounters>({} as ITaskCounters);

  useEffect(() => {
    const loadCounters = async () => {
      try {
        const { data } = await getTaskCounters();
        if (isResponseError(data)) {
          return setCounters({} as ITaskCounters);
        }
        return setCounters(data);
      } catch (e) {
        return setCounters({} as ITaskCounters);
      }
    };

    loadCounters();
  }, []);

  return counters;
};
