import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { Table } from 'widgets/Table';
import { globalStyles } from 'styles/global';

export const StyledTable = styled(Table)`
  ${globalStyles.fontSizes.s};
`;

export const VehiclesContainer = styled(Column)<ILayout>`
  max-width: 1130px;
`;
