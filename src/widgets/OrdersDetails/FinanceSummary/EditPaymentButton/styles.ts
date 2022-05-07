import styled from 'styled-components';
import { Icon } from 'ui/Icon';

export const EditPaymentIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: rotate(10deg);
  }
`;
