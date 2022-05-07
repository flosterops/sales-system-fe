import styled from 'styled-components';
import { ILayout } from 'ui/Layout';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { NavLink } from 'react-router-dom';

export const StyledSearchItem = styled(NavLink)<ILayout>`
  display: block;
  width: 100%;

  & > div {
    background-color: ${colors.white};
    margin-bottom: 20px;
    border-radius: 10px;
    height: 187px;
    width: 100%;
  }

  & img {
    max-width: 100%;
    width: auto;
    height: auto;
    border-radius: 10px;
  }
`;

export const StyledTableColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) minmax(20px, 300px);
  grid-gap: 20px 50px;
  font-size: 14px;

  div {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  div > span:first-child {
    opacity: 0.5;
    font-weight: 600;
    text-align: right;
  }

  div > span:last-child {
    font-weight: bold;
    padding: 0 0 0 13px;
  }
`;

export const StyledPrice = styled(Description)`
  & > span {
    color: ${colors.turquoise};
  }
`;

export const StyledResultBadge = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${colors.primary};
  padding: 8px 53px;
  border-radius: 10px 0;
`;
