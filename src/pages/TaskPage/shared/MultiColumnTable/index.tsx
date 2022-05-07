import React, { ReactElement } from 'react';
import { Column, ColumnContent, MultiColumnTableWrapper, TableTitle } from './styles';

export type DataColumn = {
  rowData: DataRow[];
};

export type DataRow = {
  label: string;
  value: string;
};

interface IMulitColumnTable {
  title?: string;
  columns: DataColumn[];
  footer?: ReactElement;
}

const MultiColumnTable = ({ columns, title, footer }: IMulitColumnTable) => (
  <MultiColumnTableWrapper hasTitle={!!title}>
    <TableTitle>{title}</TableTitle>
    <ColumnContent>
      {columns.map((column) => (
        <Column key={`${column.rowData[0].label}`} width={100 / columns.length}>
          {column.rowData.map((row) => (
            <React.Fragment key={`${row.label}label`}>
              <span>{row.label}</span>
              <p>{row.value}</p>
            </React.Fragment>
          ))}
        </Column>
      ))}
    </ColumnContent>
    {footer}
  </MultiColumnTableWrapper>
);

export { MultiColumnTable };
