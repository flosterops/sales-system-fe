import React, { ReactElement } from 'react';
import { Form } from 'widgets/Form';
import { Field } from 'widgets/Form/Field';
import { Row, Column } from 'ui/Layout';
import { initialTaskSummaryResolvedFormValues } from 'helpers/forms';
import { EFieldTypes, IInitialTaskSummaryResolvedFormValues } from 'models/forms';
import { isRequired } from 'widgets/Form/validations';
import { FormikProps } from 'formik';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { AlignItemsTypes, ComponentSizesTypes, JustifyContentTypes } from 'models/layout';
import { EIconTypes } from 'models/icons';

interface IResolveForm {
  onSubmit: (...args: any) => void;
}

export const ResolvedForm = ({ onSubmit }: IResolveForm): ReactElement => (
  <Form
    initialValues={initialTaskSummaryResolvedFormValues}
    onSubmit={onSubmit}
    validations={{ note: [isRequired()] }}
  >
    {(formikProps: FormikProps<IInitialTaskSummaryResolvedFormValues>): ReactElement => (
      <>
        <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.center} wrap>
          <Column componentWidth="100%" componentHeight="20%">
            <Field
              name="note"
              type={EFieldTypes.textarea}
              value={formikProps.values.note}
              label="Note *"
              placeholder="Note"
              height="100px"
            />
          </Column>
          <Column componentWidth="100%" ptop="18px">
            <Button
              mleft="auto"
              type={EButtonTypes.submit}
              componentSize={ComponentSizesTypes.m}
              icon={EIconTypes.check}
            >
              Save
            </Button>
          </Column>
        </Row>
      </>
    )}
  </Form>
);
