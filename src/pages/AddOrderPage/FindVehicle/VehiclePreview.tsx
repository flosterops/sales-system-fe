import React, { ReactElement } from 'react';
import { IVehicle } from 'models/vehicles';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { Column, Row } from 'ui/Layout';
import { priceFormatter } from 'helpers/price-format';
import { VehiclePreviewWrapper } from './styles';
import { NoImagePlaceholder } from '../../VehicleDetailsPage/NoImagePlaceholder';

interface IVehiclePreview {
  vehicle: IVehicle;
  image?: string;
}

const VehiclePreview = ({ vehicle, image }: IVehiclePreview): ReactElement => (
  <VehiclePreviewWrapper padding="30px 40px 49px" componentWidth="75vw" margin="25px 0">
    <Column>{image ? <img src={image} alt="" /> : <NoImagePlaceholder />}</Column>
    <Column mleft="10px">
      <Description
        fontSize={FontSizeTypes.l}
        color={colors.black}
        weight={WeightTypes.w700}
        mbottom="20px"
      >
        {`${vehicle?.make?.name} ${vehicle?.model?.name} ${vehicle.modelVariant}`}
      </Description>
      <Description fontSize={FontSizeTypes.m} color={colors.textPrimaryThin} mbottom="5px">
        {vehicle.registration}
      </Description>
      <Row jc={JustifyContentTypes.flexStart} mtop="10px">
        <Description
          color={colors.black}
          weight={WeightTypes.w700}
          fontSize={FontSizeTypes.xm}
        >
          Price
        </Description>
        <Description
          color={colors.turquoise}
          weight={WeightTypes.w700}
          fontSize={FontSizeTypes.xm}
          pleft="10px"
        >
          {priceFormatter(vehicle.price)}
        </Description>
      </Row>
    </Column>
  </VehiclePreviewWrapper>
);

export { VehiclePreview };
