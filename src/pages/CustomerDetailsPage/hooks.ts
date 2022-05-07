import { useEffect, useState } from 'react';
import { getWebsiteUserDetails } from 'requests/website-user';
import { isResponseError } from 'models/guards';
import { IWebsiteUserDetails } from 'models/webiste-user';

export const useCustomerDetailsUser = (id: string) => {
  const [user, setUser] = useState<IWebsiteUserDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);

    const loadUser = async (): Promise<void> => {
      try {
        const data = await getWebsiteUserDetails(Number(id));

        if (isResponseError(data)) {
          return setUser(null);
        }

        return setUser(data.data);
      } catch (e: any) {
        console.error(e.message);
        return setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return { loading, user, setUser };
};
