import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import {
  ITaskResponse,
  ITaskAssignRequest,
  ITaskCreateRequest,
  ITaskListRequest,
  ITaskListResponse,
  ITaskRequestresponse,
  ITaskRescheduleUnresolvedRequestData,
  ITaskRescheduleUnresolvedResponse,
  ITaskResolvedRequestData,
  ITasksResponse,
  ITaskSearchRequestData,
} from 'models/task';
import { Dispatch } from 'redux';
import { setTasks } from 'store/reducers/dashboard-task-reducer';
import { TResponse } from 'models/requests';
import Cookies from 'js-cookie';
import { ECookiesTypes } from '../models/cookies';
import { getBearerAuthorizationToken } from '../helpers/token';

export interface ITaskCountersResponse {
  data: ITaskCounters;
  status: 'success' | 'failed';
}

export interface ITaskCounters {
  finishedTasks: number;
  tasksInQueue: number;
}

export const getTasks = async (token: string, requestData: ITaskListRequest) => {
  const { data } = await request.dashboard.post<TResponse<ITaskListResponse>>(
    urls.taskList(),
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

export const loadDashboardTaskDispatch = async (
  token: string,
  requestData: ITaskListRequest,
  dispatch: Dispatch,
) => {
  const { data } = await request.dashboard.post<TResponse<ITaskListResponse>>(
    urls.taskList(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    dispatch(setTasks(data.data.content));
  }
};

export const getListScheduledTasksForToday = async (
  token: string,
  requestData: ITaskSearchRequestData,
) => {
  const { data } = await request.dashboard.post<TResponse<ITasksResponse>>(
    urls.getTasksForToday(),
    requestData,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (isResponseError(data)) {
    return data;
  }

  return data;
};

export const getListFinishedTasks = async (
  token: string,
  requestData: ITaskSearchRequestData,
) => {
  const { data } = await request.dashboard.post<TResponse<ITaskListResponse>>(
    urls.getFinishedTasks(),
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

export const searchAndReserveTaskAssignment = async (token: string) => {
  try {
    const { data } = await request.dashboard.get<TResponse<ITaskRequestresponse>>(
      urls.searchAndReserveTaskAssignment(),
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (isResponseError(data)) {
      return data;
    }

    return data.data.id;
  } catch (err) {
    return null;
  }
};

export const assignTask = async (token: string, requestData: ITaskAssignRequest) => {
  const { data } = await request.dashboard.post<TResponse<ITaskListResponse>>(
    urls.assignTask(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (isResponseError(data)) {
    return data;
  }

  return data;
};

export const createTask = async (token: string, requestData: ITaskCreateRequest) => {
  const { data } = await request.dashboard.post<TResponse<ITaskResponse>>(
    urls.createTask(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (isResponseError(data)) {
    return data;
  }

  return data;
};

export const getTask = async (token: string, id: string) => {
  const { data } = await request.dashboard.get<TResponse<ITaskResponse>>(urls.getTask(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (isResponseError(data)) {
    return data;
  }

  return data.data;
};

export const hasToResolveTask = async (
  token: string,
  taskId: string,
  requestData: ITaskResolvedRequestData,
) => {
  const { data } = await request.dashboard.post<TResponse<any>>(
    urls.resolveTask(taskId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return !isResponseError(data);
};
export const hasToRescheduleUnresolved = async (
  token: string,
  taskId: string,
  requestData: ITaskRescheduleUnresolvedRequestData,
) => {
  const { data } = await request.dashboard.post<TResponse<ITaskRescheduleUnresolvedResponse>>(
    urls.rescheduleUnresolvedTask(taskId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return !isResponseError(data);
};

export const getTasksForOrder = async (token: string, orderId: number) => {
  const { data } = await request.dashboard.post<TResponse<ITaskListResponse>>(
    urls.getTasksForOrder(orderId),
    {
      criteria: {},
      page: {
        pageNumber: 0,
        pageSize: 100,
      },
    },
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

export const getTaskCounters = async () => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';

  const { data } = await request.dashboard.get<ITaskCountersResponse>(urls.taskCounters(), {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (!isResponseError(data)) {
    return data;
  }

  return data;
};
