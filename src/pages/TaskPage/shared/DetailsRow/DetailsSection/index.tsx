import React, { PropsWithChildren } from 'react';
import { DetailsSectionWrapper } from './styles';

interface IDetailsSection extends PropsWithChildren<{}> {
  fullWidth?: boolean;
}

const DetailsSection = ({ fullWidth, children }: IDetailsSection) => (
  <DetailsSectionWrapper fullWidth={fullWidth}>{children}</DetailsSectionWrapper>
);

export { DetailsSection };
