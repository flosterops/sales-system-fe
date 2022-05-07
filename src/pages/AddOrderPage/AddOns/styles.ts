import styled from 'styled-components';
import { Column } from 'ui/Layout';
import { colors } from 'styles/colors';

export const StyledSummary = styled(Column)`
  padding: 20px;

  h6 {
    font-weight: 700;

    span {
      color: ${colors.turquoise};
      padding-left: 5px;
    }
  }

  table td {
    padding: 5px 0;
  }

  table td:first-child {
    text-align: right;
    padding-right: 5px;
    color: ${colors.textDisabled};
    font-weight: 600;
    width: 280px;
  }

  table td:nth-child(2) {
    font-weight: bold;
    text-align: left;
    padding-left: 10px;
    width: 180px;
  }

  table tr:last-child td {
    border-top: 1px solid ${colors.black};
    font-weight: bold;
    color: ${colors.black};
    font-size: 20px;
  }
`;
