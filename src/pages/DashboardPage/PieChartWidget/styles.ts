import styled from 'styled-components';

export const StyledImageDelete = styled.img`
  width: 15px;
  height: 15px;
  object-fit: contain;
  background-repeat: round;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
`;
