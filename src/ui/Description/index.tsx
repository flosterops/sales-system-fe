import React, { ReactElement, ReactNode, ReactNodeArray } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'styles/colors';
import {
  FontSizeTypes,
  WeightTypes,
  AlignTextTypes,
  EFontFamilies,
  ISpaceTypes,
} from 'models/layout';
import {
  styledSpace,
  styledWeight,
  styledFontSize,
  styledTextAlign,
  styledFontFamily,
  styledLh,
} from 'styles/functions';
import { isUndefined } from 'helpers/guards';

const StyledDescription = styled.p<IDescription>`
  display: flex;
  width: ${(props) => (props.componentWidth ? props.componentWidth : 'auto')};
  height: ${(props) => (props.componentHeight ? props.componentHeight : 'auto')};
  color: ${({ color }: IDescription): string => color as string};
  text-transform: ${(props: IDescription): string => (props.uppercase ? 'uppercase' : 'none')};
  opacity: ${({ opacity }: IDescription): number => (isUndefined(opacity) ? 1 : opacity)};
  ${styledTextAlign};
  ${styledFontFamily}
  ${styledSpace};
  ${styledWeight};
  ${styledFontSize};
  ${styledLh};
  ${(props: IDescription) =>
    props.textAlign &&
    css`
      display: inline-block;
    `}
`;

export interface IDescription extends ISpaceTypes {
  color?: string;
  fontSize?: FontSizeTypes;
  uppercase?: boolean;
  textAlign?: AlignTextTypes;
  weight?: WeightTypes;
  children: ReactNode | ReactNodeArray;
  fontFamily?: EFontFamilies;
  lh?: string;
  opacity?: number | undefined;
  onClick?: (...args: any) => any;
  componentWidth?: string;
  componentHeight?: string;
}

/**
 * @description - Default UI component for descriptions as <p></p>
 * @param children - react children
 * @param color - text color
 * @param fontSize - text font size
 * @param weight - text font weight
 * @param textAlign - text align
 * @param fontFamily - current font family type
 * @param lh - current line-height
 * @param opacity - text opacity
 * @param props - other kind of props as onClick and etc
 * @param componentWidth - width
 * @param componentHeight - height
 */
const Description: React.FC<IDescription> = ({
  children,
  componentWidth,
  componentHeight,
  color = colors.textPrimary,
  fontSize = FontSizeTypes.s,
  weight = WeightTypes.w500,
  textAlign = AlignTextTypes.default,
  fontFamily = EFontFamilies.default,
  lh = 'auto',
  opacity = 1,
  ...props
}: IDescription): ReactElement => (
  <StyledDescription
    color={color}
    fontSize={fontSize}
    textAlign={textAlign}
    weight={weight}
    fontFamily={fontFamily}
    lh={lh}
    opacity={opacity}
    componentWidth={componentWidth}
    componentHeight={componentHeight}
    {...props}
  >
    {children}
  </StyledDescription>
);

export { Description };
