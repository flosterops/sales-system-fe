import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';

export const StatusRowWrapper = styled(Row)`
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;

  & button {
    font-weight: 600;
    width: 170px;
    font-size: 16px;
    height: 50px;
  }

  h3 {
    font-size: 20px;
    white-space: pre-wrap;

    span {
      color: ${colors.turquoise};
    }
  }
`;

export const ButtonControls = styled.div`
  display: flex;

  & > div {
    margin: 0 30px 0 0;
    width: 170px;
    font-weight: 600px;
    font-size: 16px;

    & {
      font-size: 16px !important;
      font-weight: 600px;
    }
  }
`;
