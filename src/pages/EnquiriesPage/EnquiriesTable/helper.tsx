import { IEmailMessage, IEmailMessageListFilters } from 'models/email-message';
import { ITableColumns, ITableDataSource } from 'models/table';
import { FilterInput } from 'widgets/Table/FilterFields/FilterInput';
import { colors } from 'styles/colors';
import { EInputTypes } from 'models/forms';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { format } from 'date-fns';
import { DatePicker } from 'widgets/Form/DatePicker';

export const mapEnquiresToTable = (enquires: IEmailMessage[]): ITableDataSource[] =>
  enquires.map((e) => {
    const fullName = `${e.firstname || ''} ${e.lastname || ''}`;
    return {
      id: `${e.timestampCreated}${fullName.trim()}${e.phone}${e.email}${e.body}`,
      date: e.timestampCreated || '-',
      fullName: fullName.trim() || '-',
      phone: e.phone || '-',
      email: e.email || '-',
      message: e.body || '-',
    };
  });

export const cutAndParseHtml = (value: string) => {
  const element = document.createElement('span');
  element.innerHTML = value;

  const result = element.innerText.trim();

  return result.length > 100 ? `${result.substring(0, 100)}...` : result;
};

export const getEnquiriesColumns = (
  filters: { date: string },
  setFilters: Dispatch<SetStateAction<IEmailMessageListFilters>>,
): ITableColumns[] => [
  {
    id: 'c43da17e-53c4-4fa3-b67f-2610a013aa92',
    key: 'date',
    title: 'Date',
    render: (value): ReactNode => (
      <>{value ? format(new Date(value as string), 'dd/MM/yyyy') : ''}</>
    ),
    filterRender: () => (
      <DatePicker
        value={filters.date ? new Date(filters.date) : null}
        className="filter-input"
        color={colors.primary}
        name="date"
        helpers={{
          setValue: (value: string) => {
            setFilters((prev) => ({
              ...prev,
              date: value ? `${format(new Date(value), 'yyyy-MM-dd')}` : '',
            }));
          },
        }}
      />
    ),
    width: '133px',
  },
  {
    id: 'f2f49ef4-d65e-4288-a1eb-8fd7c70ffe3e',
    key: 'fullName',
    title: 'Full Name',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            fullName: value,
          }));
        }}
        name="fullName"
        type={EInputTypes.search}
      />
    ),
    width: '90px',
  },
  {
    id: 'fef71cf4-c188-4519-b55e-0f504e9150b7',
    key: 'phone',
    title: 'Phone Number',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            phone: value,
          }));
        }}
        name="phone"
        type={EInputTypes.search}
      />
    ),
    width: '113px',
  },
  {
    id: 'cf8ade7b-aad9-419f-83a4-c8b02e774417',
    key: 'email',
    title: 'Email',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            email: value,
          }));
        }}
        name="email"
        type={EInputTypes.search}
      />
    ),
    width: '180px',
  },
  {
    id: '4f5666d6-db1d-4db9-b7d8-69a13775dbec',
    key: 'message',
    title: 'Message',
    render: (value): ReactNode => (value ? cutAndParseHtml(value as string) : ''),
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            message: value,
          }));
        }}
        name="message"
        type={EInputTypes.search}
      />
    ),
    width: '350px',
  },
];
