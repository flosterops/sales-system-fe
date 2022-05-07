import styled, { css } from 'styled-components';
import { globalStyles } from 'styles/global';
import { colors } from 'styles/colors';
import { EIconTypes } from 'models/icons';
import { Description, IDescription } from 'ui/Description';

export const extraIconStyles = css`
  position: absolute;
  left: 20px;
  z-index: 5;
  font-size: 22px;
`;

interface IStyledField {
  color: string;
}

export const StyledField = styled.div<IStyledField>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 25px;
  border: 2px solid ${(props): string => props.color};
`;

interface IStyledTextarea {
  icon?: EIconTypes;
  error?: boolean;
  disabled?: boolean;
  resize?: string;
  height?: string;
}

export const StyledTextarea = styled.textarea<IStyledTextarea>`
  width: 100%;
  ${globalStyles.fonts.default};
  ${globalStyles.fontSizes.xm};
  border: 0;
  border-radius: 25px;
  height: ${(props): string => props.height || `${globalStyles.global.componentHeight}px`};
  color: ${colors.black};
  padding: ${(props) => (props.icon ? '0 14px 0 54px' : '14px 14px')};
  box-sizing: border-box;
  outline: 0;
  resize: ${(props): string => props.resize || 'none'};
  &:focus {
    transition: 0.2s;
  }

  ::placeholder {
    color: ${colors.placeholder};
  }

  ${(props: IStyledTextarea) =>
    props.disabled &&
    css`
      background: ${colors.disabled};
      color: ${colors.textPrimary};
      border-color: ${colors.disabled};
    `}
`;

export const StyledLabel = styled(Description)<IDescription>`
  position: absolute;
  top: -8px;
  background-color: ${colors.primary};
  color: ${colors.white};
  left: 30px;
  border-radius: 20px;
  z-index: 1;
`;
