import React, { ReactElement } from 'react';
import { Title, TitleTags } from 'ui/Title';
import { Description } from 'ui/Description';
import { Form } from 'widgets/Form';
import { initialFormValues } from 'helpers/forms';
import { FormikProps } from 'formik';
import { Field } from 'widgets/Form/Field';
import { EFieldTypes, EInputTypes, IInitialPXSpecification } from 'models/forms';
import { valueToBoolean } from 'widgets/Form/Checkbox';
import { Row } from 'ui/Layout';
import {
  ComponentSizesTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Button } from 'ui/Button';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { colors } from 'styles/colors';
import { isRequired } from 'widgets/Form/validations';
import { specifications } from 'helpers/part-exchange';
import { AddOrderSteps } from 'models/orders';
import { PxVehicleCondition } from './PXVehicleCondition';
import { SpecificationWrapper } from './styles';

interface IPxVehicleSpecification {
  setCurrentStep(arg0: AddOrderSteps): void;
  handleSubmit(arg0: IInitialPXSpecification): void;
}

const PXVehicleSpecification = ({ setCurrentStep, handleSubmit }: IPxVehicleSpecification) => (
  <Row>
    <Form
      initialValues={initialFormValues.addOrderPXSpecification}
      onSubmit={handleSubmit}
      componentWidth="100%"
      validations={{
        condition: [isRequired()],
      }}
    >
      {(formikProps: FormikProps<IInitialPXSpecification>): ReactElement => (
        <>
          <Row>
            <PxVehicleCondition formikProps={formikProps} />
          </Row>

          <Title tagName={TitleTags.h6} weight={WeightTypes.w700} mbottom="10px">
            Vehicle specification
          </Title>
          <Description mbottom="30px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
            laoreet.
          </Description>

          <SpecificationWrapper>
            {specifications.map((specification) => (
              <Field
                key={specification.id}
                name={specification.id}
                type={EFieldTypes.checkbox}
                label={specification.label}
                value={formikProps.values[specification.id]}
                onChange={(e) => {
                  formikProps.setFieldValue(specification.id, e.target.checked);
                }}
              />
            ))}
          </SpecificationWrapper>
          {valueToBoolean(formikProps.values.hasOutstandingFinance) && (
            <>
              <Row mtop="10px">
                <Field
                  name="outstandingFinanceAmount"
                  type={EInputTypes.number}
                  value={formikProps.values.outstandingFinanceAmount}
                  label="Outstanding finance amount"
                />
              </Row>
              <Row mtop="10px">
                <Field
                  name="confirmSettlement"
                  type={EFieldTypes.checkbox}
                  value={formikProps.values.confirmSettlement}
                  label="Have you confirmed the settlement figure with your lender?"
                />
              </Row>
            </>
          )}
          <Row jc={JustifyContentTypes.spaceBetween} margin="50px 0">
            <Button
              type={EButtonTypes.button}
              componentSize={ComponentSizesTypes.l}
              variant={EButtonsVariants.turquoise}
              onClick={() => setCurrentStep(AddOrderSteps.addOns)}
            >
              <Description
                color={colors.white}
                fontSize={FontSizeTypes.xm}
                weight={WeightTypes.w800}
              >
                Skip
              </Description>
            </Button>
            <Button type={EButtonTypes.submit} componentSize={ComponentSizesTypes.l}>
              <Description
                color={colors.white}
                fontSize={FontSizeTypes.xm}
                weight={WeightTypes.w800}
              >
                Get Valuation
              </Description>
            </Button>
          </Row>
        </>
      )}
    </Form>
  </Row>
);

export { PXVehicleSpecification };
