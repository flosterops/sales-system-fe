import React, { FC, useEffect, useState } from 'react';
import { EFieldTypes, IOption } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { getOrdersVrmList } from './helpers';
import { getVrmList } from '../helpers';

interface IVrmField {
  value: IOption;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
  clientId?: string;
}

export const VrmField: FC<IVrmField> = ({ value, setFieldValue, clientId }) => {
  const [vrmOptions, setVrmOptions] = useState<ISelectOptionsModel[]>([]);

  useEffect(() => {
    (async function loadOrders() {
      if (clientId) {
        const options = await getOrdersVrmList(clientId);
        setVrmOptions(options);
      }
    })();
  }, [clientId, setFieldValue, value]);

  return (
    <Field
      name="vrm"
      type={EFieldTypes.autocomplete}
      label="VRM *"
      placeholder="Type in VRM"
      value={value}
      selectProps={{ loadSuggestions: getVrmList, defaultOptions: vrmOptions }}
    />
  );
};
