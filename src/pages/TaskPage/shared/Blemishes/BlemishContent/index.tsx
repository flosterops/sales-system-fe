import React from 'react';
import { IVehicleImage } from 'models/vehicles';
import { BlemishContentWrapper } from './styles';

interface IBlemishContent {
  blemish: IVehicleImage;
}

const BlemishContent = ({ blemish }: IBlemishContent) => (
  <BlemishContentWrapper>
    <p key={blemish.fileName}>
      <span>{blemish.title}</span> - {blemish.description}
    </p>
  </BlemishContentWrapper>
);
export { BlemishContent };
