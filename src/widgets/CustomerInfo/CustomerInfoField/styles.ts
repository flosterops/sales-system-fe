import { WeightTypes } from 'models/layout';
import styled from 'styled-components';

interface CustomerInfoFieldProps {
  color: string | null;
  fontWeight: WeightTypes | null;
}

export const StyledCustomerInfoField = styled.div<CustomerInfoFieldProps>`
  position: relative;
  padding: 0 20px;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
`;
