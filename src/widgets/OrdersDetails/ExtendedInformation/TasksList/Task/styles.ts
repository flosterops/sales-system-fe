import styled from 'styled-components';
import { colors } from 'styles/colors';

export const TaskWrapper = styled.div<{ isPositive: boolean }>`
  height: 40px;
  margin: 5px 0;
  background-color: ${(props) => (props.isPositive ? colors.turquoise : colors.error)};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 0 18px;
`;

export const TaskContent = styled.div<{ width: number }>`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.white};
  text-transform: uppercase;
  align-items: center;
  width: ${(props) => props.width}%;

  &:last-of-type {
    justify-content: flex-end;
  }

  svg {
    height: 21px;
    width: 20px !important;
    margin: 0 11px 0 0;
  }
`;
