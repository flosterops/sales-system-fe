import { IVehicleImage } from 'models/vehicles';
import React, { useState } from 'react';
import { Carousel } from '../Carousel';
import { BlemishContent } from './BlemishContent';
import { BlemishesWrapper } from './styles';

interface IBlemishes {
  blemishes?: IVehicleImage[];
}

const Blemishes = ({ blemishes }: IBlemishes) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  if (!blemishes) {
    return null;
  }

  return (
    <BlemishesWrapper>
      <BlemishContent blemish={blemishes[currentSlideIndex]} />
      <Carousel
        items={blemishes}
        handleItemChange={(index: number) => setCurrentSlideIndex(index)}
      />
    </BlemishesWrapper>
  );
};

export { Blemishes };
