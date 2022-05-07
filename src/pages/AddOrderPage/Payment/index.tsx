import React, { ReactElement, useState } from 'react';
import { Title, TitleTags } from 'ui/Title';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Box } from 'ui/Box';
import { FormikProps } from 'formik';
import { Form } from 'widgets/Form';
import { initialFormValues } from 'helpers/forms';
import { EFieldTypes, IInitialPaymentOrder } from 'models/forms';
import { Column, Row } from 'ui/Layout';
import { Field } from 'widgets/Form/Field';
import { Description } from 'ui/Description';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { colors } from 'styles/colors';

interface IPayment {
  setPayment(arg0: IInitialPaymentOrder): void;
}

const Payment = ({ setPayment }: IPayment) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const toggle = (formikProps: FormikProps<IInitialPaymentOrder>, fieldName: string) => {
    Object.keys(formikProps.values).forEach((field) => {
      formikProps.setFieldValue(field, field === fieldName);
    });
  };

  const handleSubmit = (values: IInitialPaymentOrder) => {
    if (!Object.values(values).some((value) => value)) {
      setHasError(true);
      return false;
    }

    setPayment(values);
    return true;
  };

  return (
    <Box padding="30px 40px 49px" componentWidth="75vw">
      <Title
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.xl}
      >
        Payment
      </Title>

      <Form initialValues={initialFormValues.addOrderPayment} onSubmit={handleSubmit}>
        {(formikProps: FormikProps<IInitialPaymentOrder>): ReactElement => (
          <>
            <Row margin="30px 0">
              <Row>
                <Column componentWidth="50px">
                  <Field
                    name="card"
                    type={EFieldTypes.checkbox}
                    value={formikProps.values.card}
                    onChange={() => {
                      toggle(formikProps, 'card');
                    }}
                  />
                </Column>
                <Column>
                  <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
                    Card Payment
                  </Title>
                  <Description>
                    User will receive an email with total to payment amount of ...
                  </Description>
                </Column>
              </Row>
              <Row>
                <Column componentWidth="50px">
                  <Field
                    name="finance"
                    type={EFieldTypes.checkbox}
                    value={formikProps.values.finance}
                    onChange={() => {
                      toggle(formikProps, 'finance');
                    }}
                  />
                </Column>
                <Column>
                  <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
                    Finance
                  </Title>
                  <Description>
                    Finance Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Description>
                </Column>
              </Row>
            </Row>

            <Row margin="20px 0">
              <Column componentWidth="50px">
                <Field
                  name="deposit"
                  type={EFieldTypes.checkbox}
                  value={formikProps.values.deposit}
                  onChange={() => {
                    toggle(formikProps, 'deposit');
                  }}
                />
              </Column>
              <Column>
                <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
                  Deposit
                </Title>
                <Description>
                  User will receive an email with total to payment amount of &pound;49
                </Description>
              </Column>
            </Row>

            {hasError && (
              <Description weight={WeightTypes.w700} color={colors.error}>
                Please choose one option
              </Description>
            )}

            <Row jc={JustifyContentTypes.flexEnd}>
              <Button type={EButtonTypes.submit} componentSize={ComponentSizesTypes.l}>
                <Description
                  color={colors.white}
                  fontSize={FontSizeTypes.xm}
                  weight={WeightTypes.w800}
                >
                  Save & send email
                </Description>
              </Button>
            </Row>
          </>
        )}
      </Form>
    </Box>
  );
};

export { Payment };
