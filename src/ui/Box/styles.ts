import styled from 'styled-components';
import { colors } from 'styles/colors';
import { ILayout, Layout } from 'ui/Layout';
import { boxShadow } from 'styles/constants';

const boxShadowKey = 'box-shadow:';

export const BoxWrapper = styled(Layout)<ILayout>`
  border-radius: ${(props) => (props.border ? props.borderRadius : '10px')};
  border: ${(props) => (props.border ? props.border : 'none')};
  background-color: ${(props) => (props.bg ? props.bg : colors.white)};
  ${(props) => (props.boxShadow ? boxShadowKey + props.boxShadow : boxShadow)};
`;
