import React, { ReactElement } from 'react';
import { Gadget } from 'ui/Gadget';
import { Row, Column } from 'ui/Layout';
import { OverflowTypes } from 'models/layout';
import binImage from 'assets/images/bin.png';
import binGreenImage from 'assets/images/bin-green.png';
import { EModalTypes } from 'models/modal';
import { useModal } from 'widgets/Modal/context';
import { useRemoveGadget } from 'pages/DashboardPage/hooks';
import BreakListTable from 'widgets/BreakListTable';
import { StyledDescription, StyledRow, StyledImageDelete } from './styles';

interface IBreakListWidget {
  id?: string;
}

const BreakListWidget = ({ id }: IBreakListWidget): ReactElement => {
  const { openModal } = useModal();
  const useRemoveHandler = useRemoveGadget(id as string);

  return (
    <Gadget flex="1 3 calc(33% - 10px)" componentHeight="300px" padding="20px">
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
          <StyledDescription>Break List</StyledDescription>
        </Column>
      </Row>
      <StyledRow padding="10px 10px 10px 0" overflow={OverflowTypes.scroll}>
        <BreakListTable />
      </StyledRow>
    </Gadget>
  );
};

export { BreakListWidget };
