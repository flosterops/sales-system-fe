import styled from 'styled-components';
import { colors } from 'styles/colors';
import { ILayout, Row } from 'ui/Layout';

export const StyledTaskItem = styled(Row)<ILayout>`
  white-space: pre-wrap;
  background-color: ${colors.body};
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 8px;

  & span {
    text-transform: uppercase;
  }
`;
