import { CSSProperties } from 'react';
import { colors } from 'styles/colors';
import { globalStyles } from 'styles/global';
import { zIndexes } from 'styles/constants';
import { ISelectStyleOptions } from 'models/forms';
import styled from 'styled-components';
import Select from 'react-select';

export const getDefaultSelectStyle = ({ color, hasIcon }: ISelectStyleOptions) => ({
  control: (styles: CSSProperties) => ({
    ...styles,
    height: globalStyles.global.componentHeight,
    outline: 'none',
    boxShadow: 'none',
    border: `2px solid ${color}`,
    borderRadius: '25px',
    width: '100%',
    padding: `${hasIcon ? '0 14px 0 54px' : '0 14px'}`,
    fontSize: '18px',
    color: colors.placeholder,
    '&:hover': {},
    '&:last-child': {
      borderColor: 'none',
    },
    '&:focus': {},
  }),
  option: (styles: CSSProperties) => ({
    ...styles,
    minHeight: '40px',
    width: '100%',
    color: colors.black,
    borderBottom: `2px solid ${colors.white}`,
    backgroundColor: colors.white,
    padding: '10px 26px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'no-wrap',
    display: 'block',

    '&:hover': {
      backgroundColor: 'rgb(96, 110, 178, 0.15)',
      color: colors.black,
    },
  }),
  singleValue: (styles: CSSProperties) => ({
    ...styles,
    color: colors.textPrimary,
  }),
  indicatorSeparator: (styles: CSSProperties) => ({ ...styles, display: 'none' }),
  dropdownIndicator: (styles: CSSProperties, props: any) => ({
    ...styles,
    transition: '0.4s ease all',
    padding: '0',
    transform: `rotate(${props.isFocused ? '-90deg' : '90deg'})`,
  }),
  valueContainer: (styles: CSSProperties) => ({ ...styles, padding: '0', width: '100%' }),
  menuList: (styles: CSSProperties) => ({
    ...styles,
    flexDirection: 'column',
    width: '100%',
    padding: '20px 28px 28px',
  }),
  menu: (styles: CSSProperties) => ({
    ...styles,
    backgroundColor: colors.white,
    color: colors.white,
    zIndex: zIndexes.selectMenu,
    marginTop: 0,
  }),
  placeholder: (styles: CSSProperties) => ({
    ...styles,
    fontSize: '18px',
    color: colors.placeholder,
  }),
});

export const StyledSelect = styled(Select)`
  width: 100%;
  > div:first-child {
    ${globalStyles.fonts.default};
    ${globalStyles.fontSizes.default};
    height: ${globalStyles.global.componentHeight}px;
    padding: 0 0 0 12px;
    position: relative;
  }
`;

export const getFilterSelectStyle = ({ color, hasIcon }: ISelectStyleOptions) => ({
  control: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).control(styles),
    padding: '0 7px',
    height: '32px',
    minHeight: '32px',
    borderRadius: '5px',
    border: `2px solid ${colors.border}`,
    fontSize: '13px',
  }),
  option: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).option(styles),
  }),
  singleValue: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).singleValue(styles),
  }),
  indicatorSeparator: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).indicatorSeparator(styles),
  }),
  dropdownIndicator: (styles: CSSProperties, props: any) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).dropdownIndicator(styles, props),
  }),
  valueContainer: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).valueContainer(styles),
  }),
  menuList: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).menuList(styles),
  }),
  menu: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).menu(styles),
    transform: 'translateX(-50%)',
    left: '50%',
    width: '250%',
  }),
  placeholder: (styles: CSSProperties) => ({
    ...getDefaultSelectStyle({ color, hasIcon }).placeholder(styles),
    fontSize: '13px',
  }),
});

export const getSmoothSelectStyle = ({ color, hasIcon }: ISelectStyleOptions) => ({
  control: (styles: CSSProperties) => ({
    ...styles,
    height: globalStyles.global.componentHeight,
    outline: 'none',
    boxShadow: 'none',
    border: `2px solid ${color}`,
    borderRadius: '25px',
    width: '100%',
    padding: `${hasIcon ? '0 14px 0 54px' : '0 14px'}`,
    fontSize: '18px',
    zIndex: '4',
    color: colors.placeholder,
    '&:hover': {},
    '&:last-child': {
      borderColor: 'none',
    },
    '&:focus': {},
  }),
  option: (styles: CSSProperties) => ({
    ...styles,
    width: '100%',
    color: colors.placeholder,
    backgroundColor: colors.white,
    paddingLeft: '26px',
    marginRight: '16px',
    border: 'none',
    borderRadius: '20px',

    '&:hover': {
      backgroundColor: colors.primaryTransparent,
    },
  }),
  singleValue: (styles: CSSProperties) => ({
    ...styles,
    color: colors.textPrimary,
  }),
  indicatorSeparator: (styles: CSSProperties) => ({ ...styles, display: 'none' }),
  dropdownIndicator: (styles: CSSProperties, props: any) => ({
    ...styles,
    transition: '0.4s ease all',
    padding: '0',
    transform: `rotate(${props.isFocused ? '-90deg' : '90deg'})`,
  }),
  valueContainer: (styles: CSSProperties) => ({ ...styles, padding: '0', width: '100%' }),
  menuList: (styles: CSSProperties) => ({
    ...styles,
    flexDirection: 'column',
    width: '100%',
    maxHeight: '183px',
    padding: '0 16px 0 28px',

    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      borderRadius: '3px',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '3px',
      backgroundColor: '#606eb2',
    },
  }),
  menu: (styles: CSSProperties) => ({
    ...styles,
    backgroundColor: colors.white,
    borderRadius: '0 0 25px 25px',
    border: 'none',
    padding: '38px 10px 28px 0',
    transform: 'translate(0, -32px)',
    color: colors.white,
    zIndex: zIndexes.selectMenu,
  }),
  placeholder: (styles: CSSProperties) => ({
    ...styles,
    fontSize: '18px',
    color: colors.placeholder,
  }),
});
