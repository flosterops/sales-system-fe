import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from 'ui/Box';
import { Title, TitleTags } from 'ui/Title';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Form } from 'widgets/Form';
import { IInitialPXAddOns } from 'models/forms';
import { initialFormValues } from 'helpers/forms';
import { Loader } from 'ui/Loader';
import { AddOrderSteps } from 'models/orders';
import { FormikProps, useFormikContext } from 'formik';
import { AddOnsForm } from 'widgets/AddOnsForm';
import { useOrderExtras } from './hooks';
import OrderSummary from './OrderSummary';
import { IAddOrderData } from '../hooks';

interface IAddOns {
  setCurrentStep(arg0: AddOrderSteps): void;
  orderData: IAddOrderData;
  setExtras(arg0: IInitialPXAddOns | null): void;
}

const AddOns = ({ setCurrentStep, orderData, setExtras }: IAddOns) => {
  const { isLoading, getExtras } = useOrderExtras();
  const [addOns, setAddOns] = useState<IInitialPXAddOns | null>(null);

  const FormikContext = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      setAddOns(values as IInitialPXAddOns);
    }, [values]);
    return null;
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleSubmit = () => {
    setExtras(addOns);
    setCurrentStep(AddOrderSteps.collectionDelivery);
  };

  return (
    <Box padding="30px 40px 49px" componentWidth="75vw">
      <Title
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.xl}
        mbottom="20px"
      >
        AddOns
      </Title>

      <Row margin="0 auto">
        <Form
          initialValues={initialFormValues.addOrderPXAddOns}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formikProps: FormikProps<IInitialPXAddOns>): ReactElement => (
            <>
              <AddOnsForm formikProps={formikProps} vehiclePrice={orderData?.vehicle?.price} />
              <FormikContext />
            </>
          )}
        </Form>
      </Row>

      <OrderSummary addOns={addOns} extras={getExtras()} orderData={orderData} />

      <Row jc={JustifyContentTypes.flexEnd} mtop="-70px">
        <Button
          type={EButtonTypes.button}
          componentSize={ComponentSizesTypes.l}
          onClick={() => handleSubmit()}
        >
          <Description
            color={colors.white}
            fontSize={FontSizeTypes.xm}
            weight={WeightTypes.w800}
          >
            Continue To Collection/Delivery
          </Description>
        </Button>
      </Row>
    </Box>
  );
};

export { AddOns };
