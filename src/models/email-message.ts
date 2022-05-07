import { MediaMetaData } from './media';

export interface IEmailMessageListRequest {
  criteria: {
    date?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    message?: string;
  };
  page: {
    pageNumber?: number;
    pageSize?: number;
    sort?: {
      orders: [
        {
          direction?: string;
          property?: string;
        },
      ];
    };
  };
}

export interface IEmailMessageListFilters {
  date: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  message: string;
  fullName: string;
}

export interface IEmailMessage {
  timestampCreated: string;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  email: string | null;
  body: string | null;
}

export interface IMessageResponseData {
  content: IEmailMessage[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
export interface IEmailMessageResponse {
  data: IMessageResponseData;
  status: string;
}

export enum EEmailMessageType {
  email = 'EMAIL',
  message = 'SMS',
}

export enum EMessageDirection {
  incoming = 'INCOMING',
  outgoing = 'OUTGOING',
}

export interface ISendEmailRequest {
  customerId?: number;
  recipientTo: string;
  recipientCc?: string | null;
  recipientBcc?: string | null;
  sender: string;
  subject: string;
  body: string;
  comment?: string | null;
  pageTitle?: string | null;
  pageUrl?: string;
  websiteUserId: number;
  trackingData?: string | null;
  emailMessageAttachments?: string[];
}

export interface ISendTextMessage {
  websiteUserId: number;
  vehicleId?: number;
  phoneNumber: string;
  body: string;
}

interface IEmailAttachment {
  id: string;
  mediaMetadata: MediaMetaData;
}

export interface IMessageDetailResponseData {
  id: number;
  messageType: EEmailMessageType;
  messageDirection: EMessageDirection;
  body: string;
  title: string;
  timestampSent: string;
  emailMessageAttachments: IEmailAttachment[];
}

export interface IMessagesListResponse {
  data: IMessageDetailResponseData[];
  status: string;
}
