import React, { ReactElement } from 'react';
import { StyledNoImagePlaceholder } from './styles';

interface INoImagePlaceholder {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const NoImagePlaceholder = ({
  height,
  width,
  borderRadius,
}: INoImagePlaceholder): ReactElement => (
  <StyledNoImagePlaceholder height={height} width={width} borderRadius={borderRadius}>
    No image data
  </StyledNoImagePlaceholder>
);

export { NoImagePlaceholder };
