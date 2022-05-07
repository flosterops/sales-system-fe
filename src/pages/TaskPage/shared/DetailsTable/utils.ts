import { IVehicle } from 'models/vehicles';
import { format } from 'date-fns';
import { formatPrice, getNumberWithComma } from 'helpers/string-formatter';

type ColumnEntry = {
  label: string;
  data: string;
};

export const constructVehicleColumns = (vehicle: IVehicle) => {
  const leftColumn: ColumnEntry[] = [
    {
      label: 'Stock ID',
      data: vehicle.stockId,
    },
    {
      label: 'Make',
      data: vehicle.make ? vehicle.make.name.toLocaleUpperCase() : '-',
    },
    {
      label: 'Model',
      data: vehicle.model ? vehicle.model.name.toLocaleUpperCase() : '-',
    },
    {
      label: 'Variant',
      data: vehicle.modelVariant ? vehicle.modelVariant.toLocaleUpperCase() : '-',
    },
    {
      label: 'Mileage',
      data: vehicle.mileage ? getNumberWithComma(vehicle.mileage) : '-',
    },
    {
      label: 'Colour',
      // TODO: Add after API change
      data: 'BLACK',
    },
    {
      label: 'Body',
      data: vehicle.vehicleBody ? vehicle.vehicleBody.name.toLocaleUpperCase() : '-',
    },
    {
      label: 'Fuel',
      // TODO: Add after API change
      data: 'PETROL',
    },
    {
      label: 'VRM',
      data: vehicle.registration.toLocaleUpperCase(),
    },
  ];
  const rightColumn: ColumnEntry[] = [
    {
      label: 'Transmission',
      // TODO: Add after API change
      data: 'AUTOMAT',
    },
    {
      label: 'Registration Date',
      data: format(new Date(vehicle.registrationDate), 'dd/MM/yyyy').toLocaleUpperCase(),
    },
    {
      label: 'Previous Keepers',
      data: vehicle.previousKeepers ? vehicle.previousKeepers.toString() : '-',
    },
    {
      label: 'VIN',
      data: vehicle.vinNumber,
    },
    {
      label: 'CAP ID',
      data: vehicle.capCode ? vehicle.capCode.toString() : '-',
    },
    {
      label: 'Website ID',
      data: vehicle.id.toString(),
    },
    {
      label: 'MOT Expiry Date',
      data: vehicle.motExpires
        ? format(new Date(vehicle.motExpires), 'dd/MM/yyyy').toLocaleUpperCase()
        : 'n/a',
    },
    {
      label: 'VAT Qualifying',
      data: vehicle.vatQualifying ? 'YES' : 'NO',
    },
    {
      label: 'Price',
      data: vehicle.price ? formatPrice(vehicle.price) : '-',
    },
  ];

  return { leftColumn, rightColumn };
};
