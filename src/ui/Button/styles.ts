import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Ripples from 'react-ripples';
import { globalStyles } from 'styles/global';
import {
  styledButtonVariant,
  styledComponentSize as buttonSize,
  styledSpace,
} from 'styles/functions';
import { colors } from 'styles/colors';
import { IButton } from './index';

export const StyledButton = styled.button<IButton>`
  ${globalStyles.fontSizes.default};
  ${globalStyles.fonts.default};
  ${styledButtonVariant};
  cursor: pointer;
  width: ${({ width }: IButton): string => width || '100%'};
  height: ${({ height }: IButton): string =>
    height || `${globalStyles.global.componentHeight}px;`};
  display: flex;
  align-items: center;
  ${({ jc }: IButton): string => `${globalStyles.jc[jc || 'center']}px;`};
  border: none;
  outline: none;
  border-radius: ${({ borderRadius }: IButton): string => borderRadius || ' 42px'};
  :hover {
    filter: grayscale(0.2);
    transition: 0.4s ease;
  }
  padding: ${({ padding }: IButton): string => padding || '0'};

  ${(props: IButton): any =>
    props.disabled &&
    css`
      background: ${colors.disabled};
      color: ${colors.textDisabled};
    `}
`;

export const StyledButtonWrapper = styled.div<any>`
  ${buttonSize};
  ${styledSpace};
`;

interface IStyledRipples {
  borderRadius?: string;
}

export const StyledRipples = styled(Ripples)<IStyledRipples>`
  width: 100%;
  border-radius: ${(props) => (props.borderRadius ? 'no' : '42px')};
`;

export const getAdditionalButtonCSS = (extraCSS?: FlattenSimpleInterpolation) => css`
  position: absolute;
  z-index: 2;
  right: 15px;
  font-size: 22px;
  ${extraCSS}
`;
