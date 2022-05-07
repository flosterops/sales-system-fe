import { createAsyncThunk } from '@reduxjs/toolkit';

import { IError } from 'models/requests';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getListScheduledTasksForToday } from 'requests/task';
import { ITaskSearchRequestData, ITasksResponse } from 'models/task';

export const listScheduledTasksForToday = createAsyncThunk(
  '/task/list-scheduled-for-today',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get(ECookiesTypes.accessToken) ?? '';
      const requestData: ITaskSearchRequestData = {
        criteria: {},
        page: {
          pageNumber: 0,
          pageSize: 10,
          sort: { orders: [{ direction: 'ASC', property: 'string' }] },
        },
      };
      const tasks = await getListScheduledTasksForToday(token, requestData);
      const { data } = tasks as ITasksResponse;
      return data.content ?? [];
    } catch (e: any) {
      const error: AxiosError<IError> = e;
      if (!error.response) {
        throw e;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
