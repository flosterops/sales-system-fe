import styled from 'styled-components';
import { Button, IButton } from 'ui/Button';
import { ILayout, Row } from 'ui/Layout';
import { globalStyles } from 'styles/global';

export const ButtonWrapper = styled(Row)<ILayout>`
  max-width: 210px;

  a {
    width: 100%;
  }
`;

export const StyledButton = styled(Button)<IButton>`
  & button p {
    display: flex;
    ${globalStyles.jc.spaceBetween};
    font-weight: bold;
    font-size: 13px;
    padding: 0 24px 0 27px;
    ${globalStyles.ai.center};
  }

  & button p span {
    padding: 0 5px;
    font-size: 22px;
    line-height: 15px;
  }
`;
