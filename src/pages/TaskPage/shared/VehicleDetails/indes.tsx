import React, { FC } from 'react';
import { DetailsRow } from 'pages/TaskPage/shared/DetailsRow';
import { Carousel } from 'pages/TaskPage/shared/Carousel';
import { DetailsTable } from 'pages/TaskPage/shared/DetailsTable';
import { Blemishes } from 'pages/TaskPage/shared/Blemishes';
import { IVehicle, IVehicleImages } from 'models/vehicles';
import { NoImagePlaceholder } from 'pages/VehicleDetailsPage/NoImagePlaceholder';

interface IVehicleDetails {
  vehicleImages?: IVehicleImages;
  vehicleDetails?: IVehicle;
}

const extractTabInfo = (vehicleImages?: IVehicleImages) => {
  const hasPrimaryImages = vehicleImages?.vehiclePrimaryImages.length;

  const hasBlemishes = !!vehicleImages?.vehicleImperfectionsImages.length;

  return { hasPrimaryImages, hasBlemishes };
};

const getBlemishesRowHeaders = (hasBlemishes?: boolean, hasAdditionalFeatures?: boolean) => {
  const headers = [];
  if (hasAdditionalFeatures) {
    headers.push('Additional Features');
  }
  if (hasBlemishes) {
    headers.push('Blemishes');
  }
  return headers;
};

const VehicleDetails: FC<IVehicleDetails> = ({ vehicleImages, vehicleDetails }) => {
  const { hasPrimaryImages, hasBlemishes } = extractTabInfo(vehicleImages);

  return (
    <>
      <DetailsRow
        sectionHeaders={['Vehicle details']}
        components={[
          {
            key: 'carousel',
            component: hasPrimaryImages ? (
              <Carousel items={vehicleImages?.vehiclePrimaryImages} />
            ) : (
              <NoImagePlaceholder />
            ),
          },
          {
            key: 'details-table',
            component: (
              <DetailsTable columnsSize={{ left: 37, right: 63 }} vehicle={vehicleDetails} />
            ),
          },
        ]}
      />
      <DetailsRow
        sectionHeaders={getBlemishesRowHeaders(hasBlemishes, false)}
        components={[
          {
            key: 'Additional features',
            component: null,
          },
          {
            key: 'blemishes',
            component: hasBlemishes ? (
              <Blemishes blemishes={vehicleImages?.vehicleImperfectionsImages} />
            ) : null,
          },
        ]}
      />
    </>
  );
};

export default VehicleDetails;
