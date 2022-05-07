import styled from 'styled-components';
import { Description } from 'ui/Description';
import { Row } from 'ui/Layout';
import { StyledCheckboxSpan } from 'widgets/Form/Checkbox/styles';

export const DeliveryOptionsGrid = styled(Row)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 47px;

  ${StyledCheckboxSpan} {
    border-radius: 50%;
    &:before {
      border-radius: 50%;
    }
    input {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
`;

export const AddressDescription = styled(Description)`
  white-space: pre-wrap;
`;
