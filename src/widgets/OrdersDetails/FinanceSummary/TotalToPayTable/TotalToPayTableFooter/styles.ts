import styled from 'styled-components';
import { colors } from 'styles/colors';

export const StyledTotalToPayFooterTitle = styled.span`
  text-align: right;
  margin: 2px 0;
  min-height: 16px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 5px;
  line-height: 1.33;
  border-top: solid 1px ${colors.primary};
`;

export const StyledTotalToPayFooterValue = styled.p`
  padding: 5px 10px 0 13px;
  margin: 2px 0;
  min-height: 16px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  border-top: solid 1px ${colors.primary};
`;
