import styled, { css } from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { colors } from 'styles/colors';

interface ICalendarCell extends ILayout {
  allowed?: boolean;
  active?: boolean;
}

export const CalendarCell = styled(Column)<ICalendarCell>`
  padding: 0px 21px;
  background-color: ${colors.error};
  cursor: default;

  border: 1px solid ${colors.white};
  align-items: center;
  justify-content: center;
  width: 126px;
  min-width: 126px;
  height: 70px;

  & > p {
    color: ${colors.white};
    font-size: 14px;
    text-align: center;
  }

  ${(props: ICalendarCell) =>
    props.allowed &&
    css`
      background-color: ${colors.turquoise};
      cursor: pointer;

      & > p {
        color: ${colors.white};
      }
    `}
  ${(props: ICalendarCell) =>
    props.active &&
    css`
      background-color: ${colors.primary};
    `}
`;

export const CalendarRowHeader = styled(Column)<ILayout>`
  min-width: 126px;
  padding: 0 20px;
  height: 70px;
  background-color: ${colors.lightGray};
  border: 1px solid ${colors.white};
  align-items: center;
  justify-content: center;

  & > p {
    text-align: center;
    white-space: pre-line;
  }
`;

export const CalendarColumnHeader = styled(CalendarCell)<ILayout>`
  &:last-of-type {
    border-radius: 0 10px 0 0;
  }

  min-width: 126px;
  background-color: ${colors.lightGray};
  height: 70px;
  cursor: default;

  & > p {
    color: ${colors.black};
  }
`;
