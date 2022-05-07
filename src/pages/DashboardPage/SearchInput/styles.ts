import styled from 'styled-components';
import { Field } from 'widgets/Form/Field';
import { Button } from 'ui/Button';

export const StyledField = styled(Field)`
  width: 45vw;
  opacity: 0.7;
  margin: 0 auto;

  & svg {
    opacity: 0.3;
  }

  & input {
    border-color: transparent;
    box-shadow: 2px 2px 3px #dedede;
  }
`;

export const StyledButton = styled(Button)`
  position: absolute;
  right: 51px;
  top: 33px;
  width: 115px;

  & button {
    height: 44px;
  }
`;

export const HiddenButton = styled(Button)`
  display: none;
`;
