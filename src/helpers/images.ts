import { IVehicleImages } from 'models/vehicles';

interface IThumb {
  width: number;
  height?: number;
}

export const getImagePath = (path: string, thumb: IThumb | null = null) => {
  const cdnPath = process.env.REACT_APP_IMAGE_CDN;
  let thumbPath = '';
  if (thumb) {
    thumbPath = `/thumb/${thumb.width}`;
    if (thumb.height) {
      thumbPath += `x${thumb.height}x1`;
    }
  }
  return `${cdnPath}${thumbPath}/7/3/${path}`;
};

export const setImagesPaths = (imagesData: IVehicleImages) =>
  Object.keys(imagesData).forEach((images) => {
    // @ts-ignore
    imagesData[images] = imagesData[images].map((image) => ({
      ...image,
      fileName: getImagePath(image.fileName, { width: 900 }),
      thumbnail: getImagePath(image.fileName, { width: 300 }),
    }));
  });
