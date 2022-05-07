import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Column } from 'ui/Layout';
import { colors } from 'styles/colors';
import { boxShadow } from 'styles/constants';

export const TaskPageWrapper = styled(Column)`
  width: 100%;
  padding: 30px;
  border-radius: 0 10px 10px 10px;
  background-color: ${colors.white};
  ${boxShadow};
`;

export const StyledTaskLink = styled(NavLink)`
  padding: 11px 20px 17px 20px;
  opacity: 0.3;
  &.active {
    border-radius: 10px 10px 0 0;
    clip-path: inset(-5px -5px 0px -5px);
    background-color: ${colors.white};
    ${boxShadow};
    opacity: 1;
  }
`;

export const TabContainer = styled(Column)`
  max-width: 1130px;
`;
