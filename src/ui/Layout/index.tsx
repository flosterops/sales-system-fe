import React, { ReactElement, ReactNode, ReactNodeArray } from 'react';
import styled, { css } from 'styled-components';
import {
  AlignItemsTypes,
  DirectionTypes,
  ISpaceTypes,
  JustifyContentTypes,
} from 'models/layout';
import { styledDirection, styledSpace, styledJc, styledAi } from 'styles/functions';
import { colors } from 'styles/colors';

export enum LayoutTags {
  div = 'div',
  nav = 'nav',
  main = 'main',
  footer = 'footer',
  header = 'header',
  section = 'section',
  article = 'article',
  ul = 'ul',
  li = 'li',
  default = 'div',
}

export interface ILayout extends ISpaceTypes {
  direction?: DirectionTypes;
  jc?: JustifyContentTypes;
  ai?: AlignItemsTypes;
  tagName?: LayoutTags;
  bg?: string;
  layoutRef?: any;
  componentHeight?: string;
  componentWidth?: string;
  noFlex?: boolean;
  wrap?: boolean;
  style?: any;
  onClick?: (...args: any) => any;
  hovered?: boolean;
  children?: ReactNode | ReactNodeArray;
  htmlId?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  overflow?: string;
  color?: string;
  flex?: string;
  gap?: string;
}

const StyledLayout = styled.div<ILayout>`
  ${styledSpace};
  display: flex;
  position: relative;
  box-sizing: border-box;
  height: ${(props) => (props.componentHeight ? props.componentHeight : 'auto')};
  width: ${(props) => (props.componentWidth ? props.componentWidth : '100%')};
  background-color: ${(props) => (props.bg ? props.bg : 'transparent')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0px')};
  color: ${(props) => (props.color ? props.color : colors.black)};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'nowrap')};
  flex: ${(props) => (props.flex ? props.flex : '0 1 auto')};
  gap: ${(props) => (props.gap ? props.gap : 'normal normal')};
  ${styledDirection};
  ${styledJc};
  ${styledAi};
  ${(props) =>
    props.noFlex &&
    css`
      width: auto;
    `};
  ${(props) =>
    props.hovered &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    `}
  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

/**
 * @description - Default UI component for layouts
 * @param direction - layout direction as flex-direction
 * @param jc - justify-content
 * @param ai - align-items
 * @param noFlex - is layout have to be as display block
 * @param children - React children
 * @param componentHeight - layout height
 * @param componentWidth - layout width
 * @param tagName - layout tagName - semantic
 * @param layoutRef - react ref
 * @param htmlId - id of element
 * @param props - other kind of props
 */
const Layout: React.FC<ILayout> = ({
  direction = DirectionTypes.default,
  jc = JustifyContentTypes.default,
  ai = AlignItemsTypes.default,
  noFlex,
  children,
  componentHeight,
  componentWidth,
  tagName = LayoutTags.default,
  layoutRef,
  htmlId,
  ...props
}: ILayout): ReactElement => (
  <StyledLayout
    id={htmlId}
    direction={direction}
    jc={jc}
    ai={ai}
    noFlex={noFlex}
    componentHeight={componentHeight}
    componentWidth={componentWidth}
    as={tagName}
    ref={layoutRef}
    {...props}
  >
    {children}
  </StyledLayout>
);

/**
 * @description - Default Layout component with direction = row
 * @param props - layout props
 */
const Row: React.FC<ILayout> = (props: ILayout): ReactElement => {
  const { children } = props;
  return (
    <Layout {...props} direction={DirectionTypes.row}>
      {children}
    </Layout>
  );
};

/**
 * @description - Default Layout component with direction = column
 * @param props - layout props
 */
const Column: React.FC<ILayout> = (props: ILayout): ReactElement => {
  const { children } = props;
  return (
    <Layout {...props} direction={DirectionTypes.column}>
      {children}
    </Layout>
  );
};

export { Row, Column, Layout };
