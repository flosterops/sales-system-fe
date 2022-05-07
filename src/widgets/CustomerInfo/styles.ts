import styled from 'styled-components';
import { Icon } from 'ui/Icon';
import { Title } from 'ui/Title';

export const CustomerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 30px;
`;

export const CustomerEditIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: rotate(10deg);
  }
`;

export const StyledCustomerID = styled(Title)`
  font-size: 20px;
  line-height: 1.7;
  opacity: 0.5;
  margin-right: 7px;
`;

export const StyledCustomerIDValue = styled(Title)`
  font-size: 28px;
`;
