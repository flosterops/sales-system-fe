import { useEffect, useState } from 'react';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { fetchBreakReasons } from 'requests/time-track';
import { isResponseError } from 'models/guards';
import { IBreakReason } from 'models/time-track';

export const useBreakReasonOptions = () => {
  const [options, setOptions] = useState<ISelectOptionsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const loadOptions = async (): Promise<void> => {
      try {
        const data = await fetchBreakReasons();

        if (isResponseError(data)) {
          return setOptions([]);
        }

        return setOptions(
          data.data.map(
            (reason: IBreakReason): ISelectOptionsModel => ({
              value: reason.name,
              label: reason.displayName,
            }),
          ),
        );
      } catch (e: any) {
        console.error(e.message);
        return setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  return { options, loading };
};
