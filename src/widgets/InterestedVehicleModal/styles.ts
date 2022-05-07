import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { StyledTable, TableTd, THeadTitle } from 'widgets/Table/styles';

export const TitleRow = styled(Row)`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const THeadTitleStyle = styled(THeadTitle)`
  width: 160px;
`;
export const TableTdStyle = styled(TableTd)`
  width: 160px;
`;

export const StyledTableInterestedVehicle = styled(StyledTable)`
  font-size: 14px !important;
`;

export const LinkStyle = styled(NavLink)`
  color: ${colors.primary};
  &:link {
    color: ${colors.primary};
  }
  &:visited {
    color: ${colors.primary};
  }
  &:hover {
    color: ${colors.primary};
  }
  &:active {
    color: ${colors.primary};
  }
`;

export const StyledRow = styled(Row)`
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #606eb2;
  }
`;
