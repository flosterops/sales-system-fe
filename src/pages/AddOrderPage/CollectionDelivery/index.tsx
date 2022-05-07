import React, { ReactElement, useState } from 'react';
import { Title, TitleTags } from 'ui/Title';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Column, Row } from 'ui/Layout';
import { Box } from 'ui/Box';
import { Description } from 'ui/Description';
import { EFieldTypes, IInitialCollectionDelivery } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Form } from 'widgets/Form';
import { FormikProps } from 'formik';
import { initialFormValues } from 'helpers/forms';
import { EButtonTypes } from 'models/button';
import { colors } from 'styles/colors';
import { Button } from 'ui/Button';
import { AddOrderSteps } from 'models/orders';
import { IAddOrderData } from '../hooks';

interface ICollectionDelivery {
  setCollectionDelivery(arg0: IInitialCollectionDelivery): void;
  setCurrentStep(arg0: AddOrderSteps): void;
  orderData: IAddOrderData;
}

const CollectionDelivery = ({
  setCollectionDelivery,
  setCurrentStep,
  orderData,
}: ICollectionDelivery): ReactElement => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = (values: IInitialCollectionDelivery) => {
    if (!Object.values(values).some((value) => value)) {
      setHasError(true);
      return false;
    }

    setCollectionDelivery(values);
    setCurrentStep(AddOrderSteps.payment);
    return true;
  };

  const toggle = (formikProps: FormikProps<IInitialCollectionDelivery>, fieldName: string) => {
    setHasError(false);
    const fields = ['collectionLondon', 'collectionCorby', 'delivery'];
    fields.forEach((field) => {
      formikProps.setFieldValue(field, field === fieldName);
    });
  };

  return (
    <>
      <Box padding="30px 40px 49px" componentWidth="75vw">
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.xl}
        >
          Collection/Delivery
        </Title>

        <Form
          initialValues={initialFormValues.addOrderCollectionDelivery}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<IInitialCollectionDelivery>): ReactElement => (
            <>
              <Row margin="30px 0">
                <Row>
                  <Column componentWidth="50px">
                    <Field
                      name="collectionLondon"
                      type={EFieldTypes.checkbox}
                      value={formikProps.values.collectionLondon}
                      onChange={() => {
                        toggle(formikProps, 'collectionLondon');
                      }}
                    />
                  </Column>
                  <Column>
                    <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
                      Stratford/London Collection Centre
                    </Title>
                    <Description>Rick Roberts Way</Description>
                    <Description>London</Description>
                    <Description>E15 2GN</Description>
                  </Column>
                </Row>
                <Row>
                  <Column componentWidth="50px">
                    <Field
                      name="collectionCorby"
                      type={EFieldTypes.checkbox}
                      value={formikProps.values.collectionCorby}
                      onChange={() => {
                        toggle(formikProps, 'collectionCorby');
                      }}
                    />
                  </Column>
                  <Column>
                    <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
                      Corby/Northamptonshire Collection Centre
                    </Title>
                    <Description>3 Earlstrees Road</Description>
                    <Description>Corby</Description>
                    <Description>NN17 4AZ</Description>
                  </Column>
                </Row>
              </Row>
              <Row margin="30px 0">
                <Row>
                  <Column componentWidth="50px">
                    <Field
                      name="delivery"
                      type={EFieldTypes.checkbox}
                      value={formikProps.values.delivery}
                      onChange={() => {
                        toggle(formikProps, 'delivery');
                      }}
                    />
                  </Column>
                  <Column>
                    <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
                      {`Home Delivery ${orderData.websiteUser?.firstname} ${orderData.websiteUser?.lastname}`}
                    </Title>
                    {orderData.websiteUser?.address1 && (
                      <Description>{orderData.websiteUser.address1}</Description>
                    )}
                    {orderData.websiteUser?.address2 && (
                      <Description>{orderData.websiteUser.address2}</Description>
                    )}
                    {orderData.websiteUser?.town && (
                      <Description>{orderData.websiteUser.town.name}</Description>
                    )}
                    {orderData.websiteUser?.postCode && (
                      <Description>{orderData.websiteUser.postCode.postcode}</Description>
                    )}
                  </Column>
                </Row>
              </Row>

              {hasError && (
                <Description weight={WeightTypes.w700} color={colors.error}>
                  Please choose one option
                </Description>
              )}

              <Row margin="30px 0">
                <Field
                  name="note"
                  type={EFieldTypes.textarea}
                  value={formikProps.values.note}
                  placeholder="Write a note"
                  height="175px"
                />
              </Row>
              <Row jc={JustifyContentTypes.flexEnd}>
                <Button type={EButtonTypes.submit} componentSize={ComponentSizesTypes.l}>
                  <Description
                    color={colors.white}
                    fontSize={FontSizeTypes.xm}
                    weight={WeightTypes.w800}
                  >
                    Continue
                  </Description>
                </Button>
              </Row>
            </>
          )}
        </Form>
      </Box>
    </>
  );
};

export { CollectionDelivery };
