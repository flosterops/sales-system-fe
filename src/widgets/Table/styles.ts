import styled, { css } from 'styled-components';
import { styledSpace } from 'styles/functions';
import { colors } from 'styles/colors';
import { boxShadow } from '../../styles/constants';

interface ITHeadTitle {
  isSortable: boolean;
}

interface ITableRow {
  borderColor: string;
}

export const TableRow = styled.tr<ITableRow>`
  height: 50px;
  border-bottom: 1px solid ${(props: ITableRow): string => props.borderColor};
  vertical-align: center;
  box-sizing: border-box;

  &:last-of-type:not(:first-of-type) {
    border-bottom: 0;
  }
`;

export const TableTd = styled.td`
  color: ${colors.black};
  letter-spacing: normal;
  padding-right: 10px;
  &:first-of-type {
    padding-left: 10px;
  }
  &:last-of-type {
    padding-right: 16px;
  }
`;

export const THeadTitle = styled.th<ITHeadTitle>`
  color: ${colors.primary};
  padding-right: 10px;
  text-align: left;
  &:last-of-type {
    padding-right: 16px;
  }
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  ${(props) =>
    props.isSortable &&
    css`
      cursor: pointer;
      &:hover {
        ${boxShadow}
      }
    `}
`;

export const THeadTitleInner = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
`;

export const StyledTable = styled.table`
  width: 100%;
  ${styledSpace};
  border-collapse: collapse;
`;

export const TableWrapper = styled.div`
  width: 100%;
`;
