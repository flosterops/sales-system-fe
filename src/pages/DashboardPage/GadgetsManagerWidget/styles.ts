import styled from 'styled-components';
import { Description, IDescription } from 'ui/Description';

export const StyledHeadDescription = styled(Description)<IDescription>`
  width: 172px;
  height: 33px;
  margin: 30px 39px 11px 45px;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #c5c5c5;
`;

export const StyledDescription = styled(Description)<IDescription>`
  width: 218px;
  height: 28px;
  margin: 2px 18px 33px 20px;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: center;
  color: #c5c5c5;
`;

export const StyledBreakDescription = styled(Description)<IDescription>`
  width: 24px;
  height: 33px;
  margin: 0 35px 0 35px;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #c5c5c5;
`;

export const StyledImage = styled.img`
  width: 170px;
  height: 110px;
  object-fit: contain;
  background-repeat: round;
  &:hover {
    cursor: pointer;
  }
`;
