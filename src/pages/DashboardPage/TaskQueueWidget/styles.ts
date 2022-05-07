import styled from 'styled-components';
import { Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { globalStyles } from 'styles/global';
import { colors } from 'styles/colors';
import { Table } from 'widgets/Table';

interface IStyledDoubleDatePickerContainer {
  isFocused: boolean;
}

export const StyledDescription = styled(Description)`
  ${globalStyles.fonts.default}
  ${globalStyles.fontSizes.l}
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: ${colors.black};
`;

export const StyledRow = styled(Row)`
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

export const StyledImageDelete = styled.img`
  width: 15px;
  height: 15px;
  object-fit: contain;
  background-repeat: round;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledTable = styled(Table)`
  ${globalStyles.fontSizes.s};
`;

export const StyledDoubleDatePickerContainer = styled(Row)<IStyledDoubleDatePickerContainer>`
  border: 2px solid ${(props) => (props.isFocused ? colors.primary : colors.border)};
  border-radius: 5px;
  padding: 0;
  height: 32px;
  font-size: 13px;

  & input.calendar-input.filter-input {
    border-width: 0;
    border-radius: 5px;
    border-color: transparent;
    height: 28px;
    &:focus {
      border-color: transparent;
    }
  }
`;
