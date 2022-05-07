import React from 'react';
import { IPartExchange as IPartExchangeDetails } from 'models/partExchange';
import { MultiColumnTable } from 'pages/TaskPage/shared/MultiColumnTable';
import {
  getPartExchangeDetailsAsTable,
  getVehicleDetailsAsTable,
} from 'helpers/part-exchange';

interface IPartExchange {
  partExchangeDetails?: IPartExchangeDetails;
}

const PartExchange = ({ partExchangeDetails }: IPartExchange) => (
  <>
    {partExchangeDetails?.vehicleData?.vehicle && (
      <MultiColumnTable
        title="Vehicle details"
        columns={getVehicleDetailsAsTable(partExchangeDetails?.vehicleData?.vehicle)}
      />
    )}
    {partExchangeDetails && (
      <MultiColumnTable
        title="Questions and answers"
        columns={getPartExchangeDetailsAsTable(partExchangeDetails)}
      />
    )}
  </>
);

export { PartExchange };
