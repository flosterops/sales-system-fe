import React, { PropsWithChildren, ReactElement } from 'react';
import { ILayout } from 'ui/Layout';
import { GadgetWrapper } from './styles';

const Gadget = ({ children, ...props }: PropsWithChildren<ILayout>): ReactElement => (
  <GadgetWrapper {...props}>{children}</GadgetWrapper>
);

export { Gadget };
