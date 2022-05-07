import styled from 'styled-components';
import { colors } from 'styles/colors';

export const DetailsTableWrapper = styled.div`
  display: flex;
  background-color: ${colors.turquoise};
  border-radius: 10px;
  height: 298px;
  padding: 31px 17px 21px;
`;

export const TableColumn = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: ${colors.white};
  font-size: 14px;

  span {
    opacity: 0.5;
    font-weight: 600;
    text-align: right;
  }

  p {
    font-weight: bold;
    padding: 0 0 0 13px;
  }
`;

export const TableEntry = styled.div`
  display: flex;
  margin: 7px 0;
  color: ${colors.white};
  font-weight: bold;
`;
