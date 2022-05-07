import { IVehicle } from 'models/vehicles';
import React from 'react';
import { DetailsTableWrapper, TableColumn } from './styles';
import { constructVehicleColumns } from './utils';

interface IDetailsTable {
  vehicle?: IVehicle; // For now it's only vehicle but data can be dynamic in the future
  columnsSize: { left: number; right: number };
}

const DetailsTable = ({ vehicle, columnsSize }: IDetailsTable) => {
  if (!vehicle) {
    return null;
  }

  const { leftColumn, rightColumn } = constructVehicleColumns(vehicle);

  return (
    <DetailsTableWrapper>
      <TableColumn width={columnsSize.left}>
        {leftColumn.map((e) => (
          <React.Fragment key={e.label}>
            <span>{e.label}</span> <p>{e.data}</p>
          </React.Fragment>
        ))}
      </TableColumn>
      <TableColumn width={columnsSize.right}>
        {rightColumn.map((e) => (
          <React.Fragment key={e.label}>
            <span>{e.label}</span> <p>{e.data}</p>
          </React.Fragment>
        ))}
      </TableColumn>
    </DetailsTableWrapper>
  );
};

export { DetailsTable };
