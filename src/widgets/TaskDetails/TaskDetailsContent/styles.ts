import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'styles/colors';
import { Column } from 'ui/Layout';

export const ContactIconLink = styled(Link)`
  padding: 0 8px 0 8px;
  cursor: pointer;
`;

export const TaskDetailsTop = styled(Column)`
  border-bottom: 1px solid ${colors.border};
`;
