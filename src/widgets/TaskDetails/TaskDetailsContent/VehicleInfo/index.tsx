import React, { FC } from 'react';
import VehicleDetails from 'pages/TaskPage/shared/VehicleDetails/indes';
import { Loader } from 'ui/Loader';
import { useVehicleDetails } from './hooks';

interface IVehicleInfo {
  orderId?: number;
}

const VehicleInfo: FC<IVehicleInfo> = ({ orderId }) => {
  const { vehicleImages, vehicleDetails, isLoading } = useVehicleDetails(orderId);

  if (isLoading) {
    return <Loader />;
  }

  return <VehicleDetails vehicleImages={vehicleImages} vehicleDetails={vehicleDetails} />;
};

export default VehicleInfo;
