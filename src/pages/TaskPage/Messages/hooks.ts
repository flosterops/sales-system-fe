import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTask } from 'requests/task';
import { getWebsiteUser } from 'requests/website-user';

export const useWebsiteUserDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUser, setWebsiteUser] = useState<IWebsiteUserDetails | null>(null);

  useEffect(() => {
    (async function getTaskInfo() {
      setIsLoading(true);
      const token = Cookies.get(ECookiesTypes.accessToken);

      if (!token) {
        return;
      }

      try {
        if (pathname === `/task/${id}/messages`) {
          const taskInfo = await getTask(token, id);
          if (!isResponseError(taskInfo)) {
            setWebsiteUser(taskInfo.websiteUser as IWebsiteUserDetails);
          }
        } else {
          const websiteUserData = await getWebsiteUser(token, id);
          if (!isResponseError(websiteUserData)) {
            setWebsiteUser(websiteUserData.data as IWebsiteUserDetails);
          }
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, [id, pathname]);

  return {
    isLoading,
    websiteUser,
  };
};
