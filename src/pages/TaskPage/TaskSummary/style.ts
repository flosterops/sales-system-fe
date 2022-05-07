import styled from 'styled-components';
import { Description } from 'ui/Description';
import { globalStyles } from 'styles/global';
import { Icon } from 'ui/Icon';

interface IButton {
  bg: string;
  active?: boolean;
}

export const CircleButton = styled.div<IButton>`
  position: relative;
  width: 171px;
  height: 171px;
  display: flex;
  ${globalStyles.ai.center};
  ${globalStyles.jc.center};
  border: 0;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  opacity: ${(props) => (props.active ? 1 : 0.35)};
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const CircleButtonIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

export const CircleButtonLabel = styled(Description)`
  position: absolute;
  top: 185px;
`;
