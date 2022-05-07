import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Description, IDescription } from 'ui/Description';
import { ILayout, Row } from 'ui/Layout';
import { globalStyles } from 'styles/global';

export const StyledHeadDescription = styled(Description)<IDescription>`
  flex: 1;
  max-height: 30px;
`;
export const StyledDescription = styled(Description)<IDescription>`
  flex: 1;
`;
export const StyledSwitch = styled.div`
  background-color: ${colors.white};
  color: ${colors.primary};
  border-radius: 50px;
  align-self: flex-end;
  ${globalStyles.ai.center};
  ${globalStyles.jc.spaceBetween};
  width: 70%;
  max-width: 235px;
  height: 65px;
  font-size: 31px;
  padding: 6px 2px;
  font-weight: 800;
`;

export const ButtonText = styled(Description)<IDescription>`
  color: ${colors.primary};
  font-size: 18px;
  margin-right: 10px;
  font-weight: bold;
`;

export const IconWrapper = styled(Row)<ILayout>`
  border-radius: 100%;
  & > svg {
    cursor: pointer;
  }
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
