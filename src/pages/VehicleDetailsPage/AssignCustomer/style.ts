import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { Row } from 'ui/Layout';
import { Field } from 'widgets/Form/Field';

export const StyledDescription = styled(Description)`
  font-family: '';
  text-align: center;
`;
export const StyledField = styled(Field)`
  width: 438px;
  height: 50px;
`;
export const ModalContainer = styled.div`
  width: 548px;
  height: 290px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${colors.white};
`;

export const ErrorLabel = styled(Row)`
  font-size: 14px;
  color: ${colors.error};
  font-weight: 500;
  margin: 2px 0 2px 0;
`;
