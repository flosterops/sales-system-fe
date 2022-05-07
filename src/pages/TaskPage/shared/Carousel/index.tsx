import { IVehicleImage } from 'models/vehicles';
import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { CarouselWrapper } from './styles';
import { CarouselNavButton } from './CarouselNavButton';

interface ICarousel {
  items?: IVehicleImage[];
  handleItemChange?: (index: number) => void;
}

const Carousel = ({ items, handleItemChange }: ICarousel) => {
  if (!items?.length) {
    return null;
  }

  const handleSlideChange = (currentIndex: number) => {
    if (handleItemChange) {
      handleItemChange(currentIndex);
    }
  };

  return (
    <CarouselWrapper numberOfItems={items.length}>
      <ImageGallery
        items={items.map((image) => ({
          original: image.fileName,
          thumbnail: image.thumbnail ? image.thumbnail : image.fileName,
        }))}
        showIndex
        indexSeparator=" of "
        thumbnailPosition="bottom"
        showFullscreenButton={false}
        showPlayButton={false}
        onSlide={(currentIndex) => handleSlideChange(currentIndex)}
        renderLeftNav={(onClick, disabled) => (
          <CarouselNavButton direction="left" handleClick={onClick} disabled={disabled} />
        )}
        renderRightNav={(onClick, disabled) => (
          <CarouselNavButton direction="right" handleClick={onClick} disabled={disabled} />
        )}
      />
    </CarouselWrapper>
  );
};

export { Carousel };
