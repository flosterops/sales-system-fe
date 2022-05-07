import React, { ReactElement, ReactNode } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { ComponentSizesTypes, ISpaceTypes, JustifyContentTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { usePermissionsHelpers } from 'helpers/use-permissions-helpers';
import { getIconColor } from './helpers';
import {
  getAdditionalButtonCSS,
  StyledButton,
  StyledButtonWrapper,
  StyledRipples,
} from './styles';

export interface IButton extends ISpaceTypes {
  color?: string;
  width?: string;
  height?: string;
  componentSize?: ComponentSizesTypes | string;
  onClick?: (...args: any) => void;
  disabled?: boolean;
  type?: EButtonTypes;
  padding?: string;
  ref?: any;
  children: ReactNode | ReactNode[];
  tagName?: 'a' | 'button';
  variant?: EButtonsVariants;
  href?: string;
  icon?: EIconTypes;
  extraIconCss?: FlattenSimpleInterpolation;
  borderRadius?: string;
  jc?: JustifyContentTypes;
  permissions?: string[];
  hasNoRipples?: boolean;
}

const ButtonComponent: React.FC<IButton> = ({
  type = EButtonTypes.button,
  color,
  onClick,
  disabled,
  padding,
  children,
  height,
  width,
  href,
  borderRadius,
  jc,
  tagName = 'button',
  variant = EButtonsVariants.primary,
}: IButton): ReactElement => (
  <StyledButton
    as={tagName}
    href={href}
    type={type}
    color={color}
    onClick={onClick}
    disabled={disabled}
    padding={padding}
    height={height}
    width={width}
    variant={variant}
    borderRadius={borderRadius}
    jc={jc}
  >
    {children}
  </StyledButton>
);

interface IDefineRipples {
  hasNoRipples: boolean;
  wrapper: (arg0: ReactNode) => ReactElement;
  children: ReactElement;
}

const DefineRipples = ({ hasNoRipples, children, wrapper }: IDefineRipples) =>
  hasNoRipples ? wrapper(children) : children;

/**
 * @description - Default UI component for buttons
 * @param children - react children
 * @param type - current button role "submit" or "button"
 * @param color - current button color
 * @param componentSize - size of the button component
 * @param onClick - function for on click event
 * @param disabled - is button disabled
 * @param padding - padding for button
 * @param height - button height
 * @param width - button wight
 * @param tagName - button tagName
 * @param href - button redirect link
 * @param variant - used to choose button style based on the variant
 * @param props - other kind of props
 * @param icon - current icon type
 * @param extraIconCss - additional icon styles
 * @param borderRadius
 * @param permissions - array of permissions
 * @param jc
 * @param hasNoRipples
 */
const Button: React.FC<IButton> = ({
  children,
  type = EButtonTypes.button,
  color = colors.primary,
  componentSize = ComponentSizesTypes.default,
  onClick,
  disabled = false,
  padding,
  height,
  width,
  tagName,
  href,
  icon,
  variant = EButtonsVariants.primary,
  extraIconCss,
  borderRadius,
  jc,
  permissions = [],
  hasNoRipples = false,
  ...props
}: IButton) => {
  const { checkPermissions } = usePermissionsHelpers();

  if (!checkPermissions(permissions)) {
    return null;
  }

  return (
    <StyledButtonWrapper componentSize={componentSize} {...props}>
      <DefineRipples
        hasNoRipples={!hasNoRipples}
        wrapper={(element) => (
          <StyledRipples color="rgba(255,255,255,0.4)" borderRadius={borderRadius}>
            {element}
          </StyledRipples>
        )}
      >
        <ButtonComponent
          tagName={tagName}
          href={href}
          type={type}
          color={color}
          onClick={onClick}
          disabled={disabled}
          padding={padding}
          height={height}
          width={width}
          variant={variant}
          borderRadius={borderRadius}
          jc={jc}
        >
          {children}
          {icon && (
            <Icon
              type={icon}
              extra={getAdditionalButtonCSS(extraIconCss)}
              color={getIconColor(variant)}
            />
          )}
        </ButtonComponent>
      </DefineRipples>
    </StyledButtonWrapper>
  );
};

export { Button };
