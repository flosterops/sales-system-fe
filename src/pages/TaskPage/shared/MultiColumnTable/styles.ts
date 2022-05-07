import styled from 'styled-components';
import { colors } from 'styles/colors';

export const MultiColumnTableWrapper = styled.div<{ hasTitle: boolean }>`
  background-color: ${colors.lightGray};
  border-radius: 10px;
  padding: ${(props) => (props.hasTitle ? '61px' : '21px')} 13px 22px;
  position: relative;
  margin: 0 0 20px 0;
`;

export const ColumnContent = styled.div`
  display: flex;
  font-size: 14px;
`;

export const TableTitle = styled.h3`
  font-size: 20px;
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const Column = styled.div<{ width: number }>`
  max-width: ${(props) => props.width}%;
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  flex-grow: 1;

  span {
    opacity: 0.5;
    font-weight: 600;
    text-align: right;
    margin: 7px 0;
    min-height: 16px;
  }

  p {
    font-weight: bold;
    padding: 0 0 0 13px;
    margin: 7px 0;
    min-height: 16px;
  }
`;
