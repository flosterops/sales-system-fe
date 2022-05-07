import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { TableRow, TableTd, THeadTitle } from 'widgets/Table/styles';

export const EnquiriesContainer = styled(Column)<ILayout>`
  max-width: 1130px;

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
