import React from 'react';
import { TabWrapper as Wrapper } from './styles';

interface ITabWrapper {
  children: React.ReactNode;
}

const TabWrapper = ({ children }: ITabWrapper) => <Wrapper>{children}</Wrapper>;

export { TabWrapper };
