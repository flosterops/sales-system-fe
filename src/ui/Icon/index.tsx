import React, { ReactElement } from 'react';
import { ISpaceTypes } from 'models/layout';
import { EIconTypes } from 'models/icons';
import { icons } from 'helpers/constants';
import { FlattenSimpleInterpolation } from 'styled-components';
import { RotateProp } from '@fortawesome/fontawesome-svg-core';
import { StyledIcon } from './styles';

export interface IIcon extends ISpaceTypes {
  type: EIconTypes;
  color?: string;
  extra?: FlattenSimpleInterpolation;
  fontSize?: string;
  onClick?: (...args: any) => void;
  rotation?: RotateProp;
  pointer?: boolean;
  opacity?: number;
}

const Icon = ({
  type,
  color,
  extra,
  onClick,
  fontSize,
  rotation,
  pointer = false,
  ...props
}: IIcon): ReactElement => (
  <StyledIcon
    icon={icons[type]}
    color={color}
    fontSize={fontSize}
    onClick={onClick}
    extra={extra}
    rotation={rotation}
    pointer={pointer}
    swapOpacity
    {...props}
  />
);

export { Icon };
