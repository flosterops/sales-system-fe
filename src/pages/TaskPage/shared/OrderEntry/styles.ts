import styled from 'styled-components';
import { colors } from 'styles/colors';

export const OrderEntryWrapper = styled.div`
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  width: 100%;
`;

export const BasicInformation = styled.div<{ isClickable?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'auto')};
`;

export const BasicInformationHeader = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin: 0 0 0 15px;
    font-weight: 700;
  }

  &:last-of-type {
    width: 20.5%;
    padding: 0 20px 0 0;
  }
`;

export const OrderToggleIcon = styled.button<{ isActive?: boolean }>`
  margin: 0 0 0 auto;
  background: transparent;
  border: none;
  transform: ${(props) => (props.isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  padding: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
  }
`;
