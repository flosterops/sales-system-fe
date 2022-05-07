import styled from 'styled-components';
import { Column } from 'ui/Layout';

export const TotalToPayTableWrapper = styled.div`
  width: 277px;
  margin-right: 30px;
`;

export const TotalToPayColumn = styled(Column)`
  width: 100%;
  min-width: 277px;
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  justify-content: flex-end;
  flex-grow: 1;
  font-size: 14px;
`;
