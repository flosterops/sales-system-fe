import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { Table } from 'widgets/Table';
import { globalStyles } from 'styles/global';

export const EnquiresContainer = styled(Column)<ILayout>`
  max-width: 1130px;
`;

export const StyledTable = styled(Table)`
  margin-bottom: 20px;
  ${globalStyles.fontSizes.s};
`;
