import { IWebsiteUserDetails } from './webiste-user';

export interface ITaskResponse {
  data: ITask;
  status: string;
}

export interface IResolvedBy {
  active: boolean;
  createdOn: string;
  email: string;
  firstName: string;
  id: string;
  lastModifiedOn: string;
  lastName: string;
}

export interface ITask {
  id: string;
  orderId: number | null;
  businessEmailId: string | null;
  assignedTo: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    createdOn: string;
    lastModifiedOn: string;
  } | null;
  status: ETaskStatuses;
  typeKey: string;
  version: number;
  createdOn: string;
  lastModifiedOn: string;
  resolvedTime: string | null;
  resolvedBy: IResolvedBy | null;
  scheduledToTime: string | null;
  taskDisplayName: string;
  websiteUser: IWebsiteUserDetails | null;
  businessNotes: string[] | [];
  vrm: string | null;
}

export enum ETaskStatuses {
  NEW = 'NEW',
  RESOLVED = 'RESOLVED',
  UNRESOLVED = 'UNRESOLVED',
}

export interface ITaskListRequest {
  criteria: {
    taskType?: string;
    vrm?: string;
    assignedTo?: string;
    status?: string;
    orderId?: 0;
    businessEmailId?: string;
    scheduledToTimeLt?: string;
    scheduledToTimeGte?: string;
  };
  page: {
    pageNumber?: number;
    pageSize?: number;
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

export interface ITaskCreateRequest {
  taskType: number | string;
  orderId: number | string;
  businessEmailId?: string;
  businessUserId?: string;
  scheduleToTime?: string | null;
}

export interface ITaskAssignRequest {
  id: string | null;
  userId: string | null;
}

export interface ITaskListResponse {
  data: {
    content: ITask[];
    pageable: {
      [key: string]: any;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      [key: string]: any;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

export interface ITaskResponseData {
  content: object[];
  id: string;
}

export interface ITasksResponse {
  data: ITaskResponseData;
  status: string;
}

export interface ITaskSearchRequestDataOrders {
  direction: string;
  property: string;
}

export interface ITaskSearchRequestData {
  criteria: {};
  page: {
    pageNumber: number;
    pageSize: number;
    sort: {
      orders: ITaskSearchRequestDataOrders[];
    };
  };
}

export interface ITaskRequestresponse {
  data: ITaskRequestData;
  status: string;
}

export interface ITaskRequestData {
  id: string;
}

export enum ETaskTypes {
  IDENTIFICATION_DOCUMENT_CHECK_AUTOMATIC = 'IDENTIFICATION_DOCUMENT_CHECK_AUTOMATIC',
  IDENTIFICATION_DOCUMENT_CHECK_MANUAL = 'IDENTIFICATION_DOCUMENT_CHECK_MANUAL',
  FINANCE_CHECK_AUTOMATIC = 'FINANCE_CHECK_AUTOMATIC',
  FINANCE_CHECK_MANUAL = 'FINANCE_CHECK_MANUAL',
  PAYMENT_CHECK_AUTOMATIC = 'PAYMENT_CHECK_AUTOMATIC',
  PAYMENT_CHECK_MANUAL = 'PAYMENT_CHECK_MANUAL',
  PRE_SALES_CALL_MESSAGE_AUTOMATIC = 'PRE_SALES_CALL_MESSAGE_AUTOMATIC',
  SALES_CALL_MANUAL = 'SALES_CALL_MANUAL',
  PRE_DELIVERY_CALL_AUTOMATIC = 'PRE_DELIVERY_CALL_AUTOMATIC',
  PRE_DELIVERY_CALL_MANUAL = 'PRE_DELIVERY_CALL_MANUAL',
  VALETING_MANUAL = 'VALETING_MANUAL',
  PDI_CHECK_MANUAL = 'PDI_CHECK_MANUAL',
  GARDX_APPLICATION_MANUAL = 'GARDX_APPLICATION_MANUAL',
  RECORD_PREPARATION_VIDEO = 'RECORD_PREPARATION_VIDEO',
  YARD_WORKS_AUTOMATIC = 'YARD_WORKS_AUTOMATIC',
  AFTER_SALES_PAYMENT_CHECK_MANUAL = 'AFTER_SALES_PAYMENT_CHECK_MANUAL',
  READ_INCOMING_EMAIL_MANUAL = 'READ_INCOMING_EMAIL_MANUAL',
  INCOMING_CALL_MANUAL = 'INCOMING_CALL_MANUAL',
}

export enum ETaskTypeNames {
  IDENTIFICATION_DOCUMENT_CHECK_AUTOMATIC = 'Automatic identification document check',
  IDENTIFICATION_DOCUMENT_CHECK_MANUAL = 'Manual identification document check',
  FINANCE_CHECK_AUTOMATIC = 'Automatic finance check',
  FINANCE_CHECK_MANUAL = 'Manual finance check',
  PAYMENT_CHECK_AUTOMATIC = 'Automatic payment check',
  PAYMENT_CHECK_MANUAL = 'Manual payment check',
  PRE_SALES_CALL_MESSAGE_AUTOMATIC = 'Automatic pre sales call message',
  SALES_CALL_MANUAL = 'Manual sales call',
  PRE_DELIVERY_CALL_AUTOMATIC = 'Automatic pre delivery call',
  PRE_DELIVERY_CALL_MANUAL = 'Manual pre delivery call',
  VALETING_MANUAL = 'Manual valeting',
  PDI_CHECK_MANUAL = 'Manual PDI check',
  GARDX_APPLICATION_MANUAL = 'Manual GARDX application',
  RECORD_PREPARATION_VIDEO = 'Preparation video record',
  YARD_WORKS_AUTOMATIC = 'Automatic yard works',
  AFTER_SALES_PAYMENT_CHECK_MANUAL = 'Manual check after sales payment',
  READ_INCOMING_EMAIL_MANUAL = 'Manual read incoming email',
  INCOMING_CALL_MANUAL = 'Manual incoming call',
}

export interface ITaskRescheduleUnresolvedRequestData {
  note: string;
  assignTo: string;
  version: number;
  rescheduleToTime: string;
}
export interface ITaskRescheduleUnresolvedResponse {
  data: string;
  status: string;
}

export interface ITaskResolvedRequestData {
  version: number;
  note: string;
}
