import { EEmailMessageType } from 'models/email-message';

export interface IFormData {
  type: ISelectOption;
  message: string;
  title: string;
  attachments: File[];
}

export interface ISelectOption {
  label: string;
  value: EEmailMessageType;
}

export const selectOptions: ISelectOption[] = [
  { label: 'Email', value: EEmailMessageType.email },
  { label: 'Text Message', value: EEmailMessageType.message },
];

export const filesType: string[] = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
