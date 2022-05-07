import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ComponentSizesTypes } from 'models/layout';
import { EButtonsVariants } from 'models/button';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { StyledButton, ButtonWrapper } from './styles';

interface IConditionalWrapper {
  condition: boolean;
  wrapper: (arg0: ReactNode) => ReactElement;
  children: ReactElement;
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: IConditionalWrapper): ReactElement => (condition ? wrapper(children) : children);

interface INavBarButton {
  variant: EButtonsVariants;
  to?: string;
  onClick?: (...args: any) => void;
  children?: ReactNode;
}

const NavBarButton = ({ variant, to, onClick, children }: INavBarButton): ReactElement => (
  <ButtonWrapper mright="20px">
    <ConditionalWrapper
      condition={!!to}
      wrapper={(element) => <Link to={to as string}>{element}</Link>}
    >
      <StyledButton
        componentSize={ComponentSizesTypes.full}
        variant={variant}
        onClick={onClick}
        hasNoRipples
      >
        <Description color={colors.white}>{children}</Description>
      </StyledButton>
    </ConditionalWrapper>
  </ButtonWrapper>
);

export { NavBarButton };
