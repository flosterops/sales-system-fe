import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gadget } from 'ui/Gadget';
import { OverflowTypes } from 'models/layout';
import { Row, Column } from 'ui/Layout';
import { TStore } from 'store';
import { loadVehiclesDashboardDispatch } from 'requests/vehicles';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import binImage from 'assets/images/bin.png';
import binGreenImage from 'assets/images/bin-green.png';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { StyledDescription, StyledRow, StyledImageDelete, StyledTable } from './styles';
import { mapVehicles, vehiclesColumns } from './helpers';
import { useRemoveGadget } from '../hooks';

const vehiclesDashboardRequestData = {
  criteria: {},
  page: {
    pageNumber: 0,
    pageSize: 10,
  },
};

interface IVehicleWidget {
  id?: string;
}

const VehiclesWidget = ({ id }: IVehicleWidget): ReactElement => {
  const { vehicles } = useSelector((store: TStore) => ({
    vehicles: store.dashboardVehicles.vehicles,
  }));
  const dispatch = useDispatch();
  const { openModal } = useModal();

  useEffect(() => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      loadVehiclesDashboardDispatch(token, vehiclesDashboardRequestData, dispatch);
    }
  }, [dispatch]);

  const dataSource = vehicles !== null ? mapVehicles(vehicles) : null;
  const useRemoveHandler = useRemoveGadget(id as string);
  return (
    <Gadget flex="3 3 100%" componentHeight="300px" padding="20px">
      <StyledImageDelete
        src={binImage}
        onMouseOver={(e) => {
          e.currentTarget.src = binGreenImage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = binImage;
        }}
        onClick={() =>
          openModal(EModalTypes.ConfirmationWindow, {
            text: 'Are you sure you want to delete this widget?',
            confirmButtonAction: useRemoveHandler,
          })
        }
      />
      <Row>
        <Column>
          <StyledDescription>Vehicles</StyledDescription>
        </Column>
      </Row>
      <StyledRow padding="10px 10px 10px 0" overflow={OverflowTypes.scroll}>
        <StyledTable columns={vehiclesColumns} dataSource={dataSource} isSortable />
      </StyledRow>
    </Gadget>
  );
};

export { VehiclesWidget };
