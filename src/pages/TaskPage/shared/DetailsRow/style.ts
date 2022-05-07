import styled from 'styled-components';
import { Row } from 'ui/Layout';

export const DetailsRowHeader = styled(Row)<{ fullWidth?: boolean }>`
  & > h2 {
    width: ${(props) => (props.fullWidth ? '100%' : '50%')};

    &:nth-of-type(2) {
      padding: 0 0 0 ${(props) => (props.fullWidth ? '0%' : '30px')};
    }
  }
`;

export const DetailsRowContent = styled(Row)<{ isMultiElement?: boolean }>`
  margin: 0 0 9px 0;

  & > div:first-child {
    padding: 0 ${(props) => (props.isMultiElement ? '15px' : 0)} 0 0;
  }

  & > div:nth-child(2) {
    padding: 0 0 0 ${(props) => (props.isMultiElement ? '15px' : 0)};
  }
`;
