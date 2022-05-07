import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { colors } from 'styles/colors';

export const CarOrderContainer = styled(Column)<ILayout>`
  border-radius: 10px;
  background-color: ${colors.lightGray};
  min-width: 230px;
  max-width: 230px;
`;

export const CarOrderImage = styled.img<any>`
  border-radius: 10px;
  height: 130px;
  width: 100%;
`;
