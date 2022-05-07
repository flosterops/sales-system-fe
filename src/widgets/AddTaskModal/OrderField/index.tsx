import React, { FC, useEffect, useState } from 'react';
import { EFieldTypes, IOption } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { getClientOrdersList } from 'widgets/AddTaskModal/OrderField/helpers';

interface IOrderField {
  setFieldValue: (field: string, value: string | IOption, shouldValidate?: boolean) => void;
  order?: string;
  clientId?: string;
  value: IOption;
}

export const OrderField: FC<IOrderField> = ({ order, clientId, setFieldValue, value }) => {
  const [ordersOptions, setOrdersOptions] = useState<ISelectOptionsModel[]>([]);

  useEffect(() => {
    (async function loadOrders() {
      if (clientId) {
        const options = await getClientOrdersList(clientId);
        setOrdersOptions(options);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, clientId, setFieldValue]);

  return (
    <Field
      name="order"
      type={EFieldTypes.autocomplete}
      label="Order *"
      placeholder="Type in order number"
      disabled={!value}
      value={value}
      selectProps={{ loadSuggestions: getClientOrdersList, defaultOptions: ordersOptions }}
    />
  );
};
