import styled from 'styled-components';
import { ILayout, Row } from 'ui/Layout';
import { colors } from 'styles/colors';

export const Stick = styled(Row)<ILayout>`
  height: 80%;
  background: ${colors.border};
  width: 1px;
  margin: 0 2px;
`;
