import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Button, IButton } from 'ui/Button';

export const CancelButton = styled(Button)<IButton>`
  & button {
    border: 1px soild ${colors.border};
  }
`;
