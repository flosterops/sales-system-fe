import styled, { css } from 'styled-components';
import { colors } from 'styles/colors';
import { Box } from 'ui/Box';
import { Column } from 'ui/Layout';

interface IStyledBadge {
  color?: string;
}

export const StyledStatus = styled.div`
  position: relative;
  font-weight: bolder;
  font-size: 18px;

  & span {
    color: ${colors.turquoise};
  }
`;

export const StyledInterested = styled.div`
  position: relative;
  font-weight: bolder;
  font-size: 18px;
  margin-right: 30px;
  text-transform: uppercase;
`;

export const StyledBadge = styled.div<IStyledBadge>`
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 14px;
  background-color: ${colors.error};
  color: ${colors.white};
  border-radius: 50%;
  min-width: 12px;
  height: 12px;
  padding: 5px;
  line-height: 14px;
  text-align: center;

  ${(props: IStyledBadge) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

export const VehicleDetailsContentWrapper = styled.div`
  max-width: 1130px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 30px;
  width: 100%;
`;

export const VehicleDetailsContainer = styled(Box)`
  max-width: 1130px;
`;

export const VehicleDetailsButtonWrapper = styled(Column)`
  max-width: 1130px;
`;
