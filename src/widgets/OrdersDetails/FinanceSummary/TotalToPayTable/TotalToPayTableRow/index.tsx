import React, { FC } from 'react';
import { StyledTotalToPayTitle, StyledTotalToPayValue } from './styles';

interface ITotalToPayTableRow {
  title: string;
  value: string | number | undefined;
  isNegative?: boolean;
}

const TotalToPayTableRow: FC<ITotalToPayTableRow> = ({ title, value, isNegative = false }) => (
  <>
    <StyledTotalToPayTitle>{title}</StyledTotalToPayTitle>
    <StyledTotalToPayValue>{isNegative ? `-${value}` : `${value}`}</StyledTotalToPayValue>
  </>
);

export { TotalToPayTableRow };
