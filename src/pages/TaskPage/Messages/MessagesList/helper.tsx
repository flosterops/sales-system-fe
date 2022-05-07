import { EEmailMessageType } from 'models/email-message';

export interface IMessagesModel {
  body: string;
  messageType: EEmailMessageType;
  timestampSent: Date;
}
