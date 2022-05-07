import React, { ReactElement, useState } from 'react';
import { FormikProps } from 'formik';
import { initialFormValues } from 'helpers/forms';
import { IInitialPXAddOns } from 'models/forms';
import { Form } from 'widgets/Form';
import { AddOnsForm } from 'widgets/AddOnsForm';
import { IVehicle } from 'models/vehicles';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { ComponentSizesTypes, JustifyContentTypes } from 'models/layout';
import { addExtrasToCurrentOrder } from 'requests/orders';
import { Loader } from 'ui/Loader';
import { AddOnsSectionWrapper } from './styles';

interface IAddOnsSection {
  vehicleDetails?: IVehicle;
  orderId: number;
}

const AddOnsSection = ({ vehicleDetails, orderId }: IAddOnsSection): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: IInitialPXAddOns) => {
    setIsLoading(true);
    try {
      const orderExtras = [];
      if (values.warranty) {
        orderExtras.push({
          id: values.warranty as number,
          currentPrice: (values.warrantyPrice as number) ?? 0,
        });
      }
      if (values.paintProtection) {
        orderExtras.push({
          id: values.paintProtection as number,
          currentPrice: (values.paintProtectionPrice as number) ?? 0,
        });
      }
      if (values.gapInsurance) {
        orderExtras.push({
          id: values.gapInsurance as number,
          currentPrice: (values.gapInsurancePrice as number) ?? 0,
        });
      }

      await addExtrasToCurrentOrder(orderId, {
        orderExtras,
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <AddOnsSectionWrapper>
        <Loader />
      </AddOnsSectionWrapper>
    );
  }

  return (
    <AddOnsSectionWrapper padding="40px 30px 30px 19px">
      <Form
        initialValues={initialFormValues.addOrderPXAddOns}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formikProps: FormikProps<IInitialPXAddOns>): ReactElement => (
          <>
            <AddOnsForm
              formikProps={formikProps}
              vehiclePrice={vehicleDetails?.price}
              orderId={orderId}
            />
            <Row jc={JustifyContentTypes.flexEnd} mtop="-10px">
              <Button
                type={EButtonTypes.button}
                componentSize={ComponentSizesTypes.m}
                onClick={formikProps.handleSubmit}
                height="50px"
              >
                Save & send e-mail
              </Button>
            </Row>
          </>
        )}
      </Form>
    </AddOnsSectionWrapper>
  );
};

export { AddOnsSection };
