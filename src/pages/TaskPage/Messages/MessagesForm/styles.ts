import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { Field } from 'widgets/Form/Field';

export const StyledField = styled(Field)`
  margin-top: 20px;
`;

export const StyledFieldAttachments = styled(Field)`
  margin: 25px auto;
  padding: 1px 10px;
`;

export const ErrorLabel = styled(Row)`
  font-size: 14px;
  color: ${colors.error};
  font-weight: 500;
  margin: 2px 0 2px 0;
`;
