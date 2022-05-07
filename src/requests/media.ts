import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { MediaSaveResponse } from 'models/media';

export const saveFile = async (token: string, requestData: File) => {
  const formData = new FormData();
  formData.append('file', requestData);
  const { data } = await request.dashboard.post<MediaSaveResponse>(urls.saveFile(), formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
