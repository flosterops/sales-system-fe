import React, { ReactElement } from 'react';
import { Column } from 'ui/Layout';
import { AlignItemsTypes } from 'models/layout';
import { IVehicleLookup } from 'models/part-exchange';
import { PreviewColumn, PreviewWrapper } from './styles';

interface IPxVehiclePreview {
  vehicle: IVehicleLookup;
}

const PxVehiclePreview = ({ vehicle }: IPxVehiclePreview): ReactElement => (
  <>
    <Column ai={AlignItemsTypes.center}>
      <PreviewWrapper>
        <PreviewColumn>
          <table>
            <tbody>
              <tr>
                <td>Make</td>
                <td>{vehicle.make}</td>
              </tr>
              <tr>
                <td>Colour</td>
                <td>{vehicle.exteriorColour}</td>
              </tr>
              <tr>
                <td>Derivative</td>
                <td>{vehicle.derivative}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{vehicle.yearOfManufacture}</td>
              </tr>
            </tbody>
          </table>
        </PreviewColumn>
        <PreviewColumn>
          <table>
            <tbody>
              <tr>
                <td>Colour</td>
                <td>{vehicle.exteriorColour}</td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>{vehicle.transmission}</td>
              </tr>
              <tr>
                <td>Engine Size</td>
                <td>{vehicle.engineCapacity}</td>
              </tr>
            </tbody>
          </table>
        </PreviewColumn>
      </PreviewWrapper>
    </Column>
  </>
);

export { PxVehiclePreview };
