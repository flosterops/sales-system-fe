import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import {
  IAddNoteRequest,
  IAddNoteResponse,
  INoteSearchByTaskRequest,
  INoteSearchByTaskResponse,
} from 'models/notes';

export const getNotesByTask = async (
  token: string,
  taskId: string,
  requestData: INoteSearchByTaskRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<INoteSearchByTaskResponse>>(
    urls.getNotesByTaskId(taskId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    return data;
  }

  return data;
};

export const getNotesByCustomer = async (
  token: string,
  customerId: number | string,
  requestData: INoteSearchByTaskRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<INoteSearchByTaskResponse>>(
    urls.getNotesByCustomerId(customerId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    return data;
  }

  return data;
};

export const addNote = async (
  token: string,
  requestData: IAddNoteRequest,
): Promise<boolean> => {
  const { data } = await request.dashboard.post<TResponse<IAddNoteResponse>>(
    urls.addBusinessNote(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return !isResponseError(data);
};
