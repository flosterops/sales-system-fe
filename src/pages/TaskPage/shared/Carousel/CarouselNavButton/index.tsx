import React from 'react';
import leftIcon from 'assets/images/left-carousel-item.png';
import rightIcon from 'assets/images/right-carousel-item.png';
import { NavIcon } from './styles';

interface ICarouselNavButton {
  handleClick: React.MouseEventHandler<HTMLElement>;
  disabled: boolean;
  direction: 'left' | 'right';
}

const CarouselNavButton = ({ direction, handleClick, disabled }: ICarouselNavButton) => (
  <NavIcon
    disabled={disabled}
    onClick={handleClick}
    type="button"
    className={`image-gallery-icon image-gallery-${direction}-nav`}
  >
    <img
      src={direction === 'left' ? leftIcon : rightIcon}
      alt={direction === 'left' ? 'Previous item' : 'Next item'}
    />
  </NavIcon>
);

export { CarouselNavButton };
