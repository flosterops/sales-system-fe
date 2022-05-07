import styled from 'styled-components';
import { Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { globalStyles } from 'styles/global';

export const GadgetName = styled(Description)`
  width: auto;
  height: 100%;
  ${globalStyles.fonts.bree}
  ${globalStyles.fontSizes.xm}
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #111;
`;

export const StyledGadgetBarRow = styled(Row)`
  border: solid 3px rgba(112, 112, 112, 0.2);
`;

export const GadgetBarStyledImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  background-repeat: round;
`;

export const StyledImg = styled.img`
  background-repeat: round;
  object-fit: contain;
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;
