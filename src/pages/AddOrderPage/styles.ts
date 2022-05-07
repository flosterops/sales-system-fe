import styled, { css } from 'styled-components';
import { colors } from 'styles/colors';

interface IStyledStep {
  touched?: boolean;
  active?: boolean;
  untouched?: boolean;
}

export const StyledStep = styled.div<IStyledStep>`
  display: flex;
  max-width: 160px;

  & div:first-child {
    color: ${colors.primaryDisabled};
    font-weight: bold;
    font-size: 48px;
  }

  & div:last-child {
    display: flex;
    align-items: flex-end;
    color: ${colors.black};
    font-weight: bold;
    margin-bottom: 7px;
    margin-left: 10px;
  }

  ${(props: IStyledStep) =>
    props.touched &&
    css`
      & div:first-child {
        color: ${colors.turquoise};
      }
    `}

  ${(props: IStyledStep) =>
    props.active &&
    css`
      & div:first-child {
        color: ${colors.primary};
      }
    `}
`;
