import { MediaMetaData } from 'models/media';

export enum ENoteType {
  global = 'GLOBAL',
  sales = 'SALES',
  task = 'TASK',
}

interface IAttachment {
  id: string;
  mediaMetadata: MediaMetaData;
}

export interface INote {
  id: string;
  content: string;
  noteType: ENoteType;
  websiteUserId: string | null;
  fullName: string | null;
  taskId: string;
  createdOn: string;
  businessNoteAttachments: IAttachment[];
}

export interface INoteSearchByTaskResponse {
  data: {
    content: INote[];
  };
  status: string;
}

export interface INoteSearchByTaskRequest {
  criteria: {};
  page?: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      orders: [
        {
          direction: string;
          property: string;
        },
      ];
    };
  };
}

export interface IAddNoteRequest {
  content: string;
  noteType: string;
  taskId?: string;
  websiteUserId?: string | number;
  businessNoteAttachments?: string[];
}
export interface IAddNoteResponse {
  data: object;
  status: string;
}
