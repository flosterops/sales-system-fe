import styled from 'styled-components';
import { colors } from 'styles/colors';

interface IStyledNoImagePlaceholder {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const StyledNoImagePlaceholder = styled.div<IStyledNoImagePlaceholder>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.border};
  color: ${colors.textDisabled};
  width: ${(props) => (props.width ? props.width : '100%')};
  margin-bottom: 20px;
  height: ${(props) => (props.height ? props.height : '320px')};
  font-weight: 600;
  font-size: 24px;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0px')};
`;
