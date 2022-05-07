import React from 'react';
import { useFormikContext } from 'formik';
import { EFieldTypes, IInitialAddTaskFormValues, IOption } from 'models/forms';
import { Row } from 'ui/Layout';
import { Field } from 'widgets/Form/Field';
import { getClientIdList } from '../helpers';
import { OrderField } from '../OrderField';
import { VrmField } from '../VrmField';

interface AddTaskInitalizedFields {
  clientIdDefaultOption: IOption[];
  vrmDefaultOption: IOption[];
  orderDefaultOption: IOption[];
  clientId?: string;
}

const AddTaskInitializedFields = ({
  clientIdDefaultOption,
  vrmDefaultOption,
  orderDefaultOption,
  clientId,
}: AddTaskInitalizedFields) => {
  const formikProps = useFormikContext<IInitialAddTaskFormValues>();

  return (
    <>
      <Row mbottom="30px">
        <Field
          name="clientId"
          type={EFieldTypes.autocomplete}
          label="Client ID *"
          placeholder="Type in client ID or name"
          selectProps={{
            loadSuggestions: getClientIdList,
            defaultOptions: clientIdDefaultOption,
          }}
          value={clientIdDefaultOption[0]}
        />
      </Row>
      <Row mbottom="30px">
        <OrderField
          clientId={clientId}
          value={orderDefaultOption[0]}
          setFieldValue={formikProps.setFieldValue}
        />
      </Row>
      <Row mbottom="30px">
        <VrmField
          clientId={clientId}
          value={vrmDefaultOption[0]}
          setFieldValue={formikProps.setFieldValue}
        />
      </Row>
    </>
  );
};

export { AddTaskInitializedFields };
