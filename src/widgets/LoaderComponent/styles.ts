import styled from 'styled-components';
import { Column, ILayout } from 'ui/Layout';
import { zIndexes } from 'styles/constants';
import { Description } from 'ui/Description';
import { globalStyles } from 'styles/global';
import { Button } from 'ui/Button';

interface IModalWrapper extends ILayout {
  visible: boolean;
}

export const ModalWrapper = styled(Column)<IModalWrapper>`
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: ${(props: IModalWrapper): number =>
    props.visible ? zIndexes.modal : zIndexes.modalHidden};
  display: ${(props: IModalWrapper): string => (props.visible ? 'true' : 'none')};
  transition: all 0.3s ease;
`;

export const Title = styled(Description)`
  ${globalStyles.fontSizes.xl}
  font-weight: Bold;
  opacity: 1;
  margin-bottom: 30px;
`;

export const CloseButton = styled(Button)`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;

  & svg {
    cursor: pointer;
  }
`;
