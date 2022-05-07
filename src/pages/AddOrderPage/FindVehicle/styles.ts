import styled from 'styled-components';
import { Row } from 'ui/Layout';
import { colors } from 'styles/colors';

export const VehiclePreviewWrapper = styled(Row)`
  background: ${colors.lightGray};
  border-radius: 5px;

  & img {
    width: 95%;
  }
`;
