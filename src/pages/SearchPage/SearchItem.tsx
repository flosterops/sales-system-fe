import React, { ReactElement } from 'react';
import { Column, Row } from 'ui/Layout';
import { ISearchVehicle } from 'models/search';
import { Description } from 'ui/Description';
import { formatPrice, getNumberWithComma } from 'helpers/string-formatter';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'models/layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { NoImagePlaceholder } from '../VehicleDetailsPage/NoImagePlaceholder';
import { StyledPrice, StyledResultBadge, StyledSearchItem, StyledTableColumn } from './styles';

interface ISearchItem {
  result: ISearchVehicle;
}

const SearchItem = ({ result }: ISearchItem): ReactElement => (
  <StyledSearchItem to={`/vehicle/${result.vehicleId}`}>
    <Row>
      <Column componentWidth="30%">
        {result.thumbnail ? (
          <img src={result.thumbnail} alt="" />
        ) : (
          <NoImagePlaceholder height="187px" borderRadius="10px" />
        )}
      </Column>
      <Column>
        <Row jc={JustifyContentTypes.spaceBetween} margin="20px 0" padding="0 20px">
          <Description fontSize={FontSizeTypes.xm} weight={WeightTypes.w700}>{`${
            result.make
          } ${result.model} ${result.modelVariant ?? ''}`}</Description>
          <StyledPrice weight={WeightTypes.w700} fontSize={FontSizeTypes.xm}>
            Price <span>{result.price ? formatPrice(result.price) : '-'}</span>
          </StyledPrice>
        </Row>
        <Row componentWidth="90%" margin="40px 0 0 25px">
          <StyledTableColumn>
            <div>
              <span>VRM</span>
              <span>{result.registration}</span>
            </div>
            <div>
              <span>Make</span>
              <span>{result.make}</span>
            </div>
            <div>
              <span>Model</span>
              <span>{result.model}</span>
            </div>
            <div>
              <span>Derivative</span>
              <span>{result.modelVariant ?? '-'}</span>
            </div>
            <div>
              <span>Mileage</span>
              <span>{result.mileage ? getNumberWithComma(result.mileage) : '-'}</span>
            </div>
            <div>
              <span>Fuel</span>
              <span>{result.vehicleFuelTypeName}</span>
            </div>
            <div>
              <span>Year</span>
              <span>
                {result.registrationDate
                  ? new Date(result.registrationDate).getFullYear()
                  : '-'}
              </span>
            </div>
            <div>
              <span>Transmission</span>
              <span>{result.transmission}</span>
            </div>
          </StyledTableColumn>
        </Row>
      </Column>
      <StyledResultBadge>
        <Icon type={EIconTypes.car} color={colors.white} fontSize="24px" />
      </StyledResultBadge>
    </Row>
  </StyledSearchItem>
);

export { SearchItem };
