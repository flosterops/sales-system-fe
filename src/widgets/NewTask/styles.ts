import styled from 'styled-components';
import { Description } from 'ui/Description';
import { globalStyles } from 'styles/global';

export const StyledTitle = styled(Description)`
  ${globalStyles.fontSizes.l}
  line-height: 1.5;
`;

export const StyledDescription = styled(Description)`
  ${globalStyles.fontSizes.xm}
  line-height: 1.5;
  font-weight: normal;
  text-align: center;
`;

export const StyledImageQuestionMark = styled.img`
  width: 100px;
  height: 103px;
`;
