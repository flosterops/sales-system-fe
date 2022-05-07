import React, { FC } from 'react';
import { StyledTotalToPayFooterTitle, StyledTotalToPayFooterValue } from './styles';

interface ITotalToPayTableFooter {
  title: string;
  value: string | number | undefined;
}

const TotalToPayTableFooter: FC<ITotalToPayTableFooter> = ({ title, value }) => (
  <>
    <StyledTotalToPayFooterTitle>{title}</StyledTotalToPayFooterTitle>
    <StyledTotalToPayFooterValue>{value}</StyledTotalToPayFooterValue>
  </>
);

export { TotalToPayTableFooter };
