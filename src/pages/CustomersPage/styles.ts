import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { Table } from 'widgets/Table';
import { globalStyles } from 'styles/global';
import { TableRow, TableTd, THeadTitle } from 'widgets/Table/styles';

export const CustomersContainer = styled(Column)<ILayout>`
  max-width: 1130px;
`;

export const StyledTable = styled(Table)`
  ${globalStyles.fontSizes.s};
  & tbody ${TableRow} {
    &:first-of-type {
      & ${TableTd} {
        padding-left: 0;
        &:last-of-type {
          padding-right: 0;
        }
      }
    }
  }

  & ${THeadTitle} {
    white-space: nowrap;
    &:first-of-type {
      padding-left: 0;
    }
  }

  & ${TableTd} {
    padding-right: 20px;
    &:first-of-type {
      padding-left: 10px;
    }
    &:last-of-type {
      padding-right: 0;
    }
  }
`;
