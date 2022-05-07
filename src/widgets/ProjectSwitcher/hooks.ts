import { useEffect, useState } from 'react';
import { fetchUserApps, IUserApp } from 'requests/user';
import { ERouteLinks } from 'models/route';
import { isResponseError } from 'models/guards';
import { IPlatformConfig } from './index';

export enum EAppKeyTypes {
  ADMIN = 'ADMIN',
  SALMA = 'SALMA',
}

export const appPaths = {
  [EAppKeyTypes.ADMIN]: process.env.REACT_APP_ADMIN_PANEL_PATH,
  [EAppKeyTypes.SALMA]: process.env.REACT_APP_SALMA_PATH,
};

export const mapUserAppsToPlatformConfig = (apps: IUserApp[]) =>
  apps.map(
    (app: IUserApp): IPlatformConfig => ({
      id: app.id,
      name: app.displayName,
      shortName: app.displayName
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase())
        .join(''),
      path: appPaths[app.key as EAppKeyTypes] as ERouteLinks,
    }),
  );

export const useFetchUserApps = () => {
  const [apps, setApps] = useState<IPlatformConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const data = await fetchUserApps();

        if (isResponseError(data)) {
          return setApps([]);
        }

        return setApps(mapUserAppsToPlatformConfig(data.data));
      } catch (e: any) {
        return setApps([]);
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  return { apps, loading };
};
