import React, { ReactElement } from 'react';
import { Gadget } from 'ui/Gadget';
import binImage from 'assets/images/bin.png';
import binGreenImage from 'assets/images/bin-green.png';
import { EModalTypes } from 'models/modal';
import { useModal } from 'widgets/Modal/context';
import { PieChart } from './PieChart';
import { StyledImageDelete } from '../VehiclesWidget/styles';
import { useRemoveGadget } from '../hooks';

interface IPieChartWidget {
  id?: string;
  isDelete?: boolean;
}

const PieChartWidget = ({ id, isDelete = false }: IPieChartWidget): ReactElement => {
  const { openModal } = useModal();
  const useRemoveHandler = useRemoveGadget(id as string);

  return (
    <Gadget componentHeight="300px" flex="1 3 calc(33% - 10px)" padding="20px">
      {isDelete && (
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
      )}
      <PieChart />
    </Gadget>
  );
};

export { PieChartWidget };
