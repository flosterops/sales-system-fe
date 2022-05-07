import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Column } from 'ui/Layout';

export const FinanceSummaryWrapper = styled(Column)`
  background-color: ${colors.lightGray};
  border-radius: 10px;
`;

export const TotalDueTable = styled.div`
  margin-top: 7px;

  & th {
    font-size: 14px;
  }
  & td {
    font-size: 14px;
  }
`;
