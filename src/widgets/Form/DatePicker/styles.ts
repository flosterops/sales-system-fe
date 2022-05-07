import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import { colors } from 'styles/colors';
import { globalStyles } from 'styles/global';
import { Row } from 'ui/Layout';
import { EIconTypes } from 'models/icons';
import { Description, IDescription } from 'ui/Description';
import { IStyledInput } from '../Input/styles';

interface IDatePickerContainer {
  color: string;
  icon?: EIconTypes;
}

export const DatePickerContainer = styled(Row)<Omit<IDatePickerContainer, 'onChange'>>`
  & .calendar-input {
    width: 100%;
    ${globalStyles.fonts.default};
    ${globalStyles.fontSizes.xm};
    height: ${globalStyles.global.componentHeight}px;
    border-radius: 25px;
    border: 2px solid ${(props): string => props.color};
    color: ${colors.black};
    padding: ${(props) => (props.icon ? '0 14px 0 54px' : '0 14px')};
    box-sizing: border-box;
    outline: 0;
    &:focus {
      transition: 0.2s;
    }

    ::placeholder {
      color: ${colors.placeholder};
    }

    &.filter-input {
      border: 2px solid ${colors.border};
      border-radius: 5px;
      padding: 0 7px;
      height: 32px;
      font-size: 13px;
      &:focus {
        border: 2px solid ${(props) => props.color};
        transition: none;
      }
    }
  }
`;

export const StyledLabel = styled(Description)<IDescription>`
  position: absolute;
  top: -8px;
  background-color: ${colors.primary};
  color: ${colors.white};
  left: 30px;
  border-radius: 20px;
  z-index: 1;
`;

export const StyledDatePicker = styled(ReactDatePicker)<IStyledInput>``;
