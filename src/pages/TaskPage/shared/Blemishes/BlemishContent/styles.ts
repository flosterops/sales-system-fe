import styled from 'styled-components';
import { colors } from 'styles/colors';

export const BlemishContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.yellow};
  border-radius: 10px 10px 0 0;
  padding: 18px 17px 28px 17px;
  margin: 0 0 -10px 0;
  font-size: 0.75rem;

  p {
    text-transform: capitalize;

    &:not(p:first-of-type) {
      margin: 6px 0 0 0;
    }
  }

  span {
    font-weight: 700;
  }
`;
