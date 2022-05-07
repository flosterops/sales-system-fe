import React, { ReactElement } from 'react';
import { Column, ILayout } from 'ui/Layout';
import { Description } from 'ui/Description';
import { EFontFamilies, FontSizeTypes, WeightTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { CarOrderContainer, CarOrderImage } from './styles';

interface ICarOrder extends ILayout {
  img: string;
  title: string;
  type: string;
  orderNumber: string;
  status: string;
  alt: string;
}

const CarOrder = ({
  img,
  title,
  type,
  orderNumber,
  status,
  alt,
  ...props
}: ICarOrder): ReactElement => (
  <CarOrderContainer componentHeight="100%" {...props}>
    <CarOrderImage src={img} alt={alt} />
    <Column padding="9px 20px 16px">
      <Description fontSize={FontSizeTypes.xm} fontFamily={EFontFamilies.bree}>
        {title}
      </Description>
      <Description mtop="10px" weight={WeightTypes.w600} color={colors.textDisabled}>
        {type}
      </Description>
      <Description mtop="10px" weight={WeightTypes.w600} color={colors.textDisabled}>
        Order number
      </Description>
      <Description weight={WeightTypes.w800}>{orderNumber}</Description>
      <Description mtop="10px" weight={WeightTypes.w600} color={colors.textDisabled}>
        Order status
      </Description>
      <Description weight={WeightTypes.w800}>{status}</Description>
    </Column>
  </CarOrderContainer>
);

export { CarOrder };
