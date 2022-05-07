import React, { ReactElement } from 'react';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { useHistory } from 'react-router-dom';
import { ERouteLinks } from 'models/route';

interface IAddOrderButton {
  userId: number;
}

const AddOrderButton = ({ userId }: IAddOrderButton): ReactElement => {
  const history = useHistory();
  // ToDo: add permissions
  const permissions: string[] = [];

  return (
    <Button
      type={EButtonTypes.button}
      onClick={() => history.push(`${ERouteLinks.addOrder}?userId=${userId}`)}
      permissions={permissions}
    >
      Add order
    </Button>
  );
};

export { AddOrderButton };
