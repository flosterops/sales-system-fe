import React, { FC, ReactElement, useEffect, useState } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Description } from 'ui/Description';
import { Form } from 'widgets/Form';
import { Field } from 'widgets/Form/Field';
import { EButtonTypes } from 'models/button';
import { EFieldTypes, EInputTypes, IInitialAddPaymentFormValues } from 'models/forms';
import { Box } from 'ui/Box';
import { TitleTags } from 'ui/Title';
import { colors } from 'styles/colors';
import { initialFormValues } from 'helpers/forms';
import { isRequired } from 'widgets/Form/validations';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { Loader } from 'ui/Loader';
import { addPaymentRequest, editPaymentRequest } from 'requests/orders';
import { useModal } from 'widgets/Modal/context';
import { EVehicleAccountingVatId, IVehiclePayment } from 'models/vehicles';
import { getListContacts } from 'requests/contact';
import { AddPaymentTitle } from './styles';
import { EPaymentModalTypes, PaymentOptionsArray } from './helpers';

interface IPaymentModal {
  type: EPaymentModalTypes;
  orderId: number;
  handleDataUpdated: (id: number) => Promise<void>;
  data?: IVehiclePayment;
}

interface IOption {
  label: string;
  value: number;
}

export const isRequiredForForcedPayment =
  (errorText?: string) => (formValues: FormikValues) => {
    const { value, values } = formValues;

    if (values.paymentType === EVehicleAccountingVatId.ForcedPayment) {
      return value ? '' : errorText || 'This field is required';
    }

    return '';
  };

const getInitialValues = (
  type: EPaymentModalTypes,
  companies: IOption[],
  data?: IVehiclePayment,
) => {
  if (data && type === EPaymentModalTypes.edit) {
    return {
      paymentType: PaymentOptionsArray.find(
        (option) => option.label === data.vehicleAccountingVatName,
      )?.value,
      amount: data.amount,
      company: companies.find((option) => option.label === data.contactName)?.value,
      agreementNumber: data.agreementNumber,
      paymentId: data.paymentId,
      description: data.description,
    };
  }

  return { ...initialFormValues.addPayment };
};

const AddPaymentModal: FC<IPaymentModal> = ({
  type,
  orderId,
  handleDataUpdated,
  data,
}): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<IOption[]>([]);
  const { closeModal } = useModal();

  useEffect(() => {
    (async function loadCompanies() {
      setIsLoading(true);
      try {
        const token = Cookies.get(ECookiesTypes.accessToken);
        const response = await getListContacts(token as string);
        setCompanies(
          response.data.map((option) => ({
            value: option.id,
            label: option.name,
          })),
        );
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, []);

  const handleSubmit = async (values: IInitialAddPaymentFormValues) => {
    setIsLoading(true);
    try {
      switch (type) {
        case EPaymentModalTypes.add:
          await addPaymentRequest(orderId, {
            contactId: Number(values.company),
            amount: Number(values.amount),
            description: values.description,
            paymentId: values.paymentId as string,
            agreementNumber: values.agreementNumber as string,
            vehicleAccountType: values.paymentType,
          });
          break;
        default:
          await editPaymentRequest(orderId, {
            vehicleAccountingId: data?.id as number,
            contactId: (Number(values.company) ||
              companies.find((option) => option.label === data?.contactName)?.value) as number,
            amount: Number(values.amount),
            description: values.description,
            paymentId: values.paymentId as string,
            agreementNumber: values.agreementNumber as string,
            vehicleAccountType: values.paymentType,
          });
          break;
      }
      handleDataUpdated(orderId);
      closeModal();
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box componentWidth="548px" padding="85px 55px 45px">
      <AddPaymentTitle
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.l}
      >
        {type === EPaymentModalTypes.add ? 'Add payment' : 'Edit payment'}
      </AddPaymentTitle>
      <Form
        initialValues={getInitialValues(type, companies, data)}
        onSubmit={handleSubmit}
        validations={{
          paymentType: [isRequired('Please select the payment type')],
          amount: [isRequired()],
          company: [isRequiredForForcedPayment('Please choose a company')],
          agreementNumber: [isRequiredForForcedPayment('Please provide a agreement number')],
        }}
      >
        {(formikProps: FormikProps<IInitialAddPaymentFormValues>): ReactElement => (
          <>
            <Row mbottom="30px">
              <Field
                name="paymentType"
                type={EFieldTypes.select}
                label="Select the payment type *"
                placeholder="Select the payment type"
                options={PaymentOptionsArray}
              />
            </Row>
            <Row mbottom="30px">
              <Field
                name="amount"
                type={EInputTypes.text}
                placeholder="Amount (Tax inclusive)"
                label="Amount (Tax inclusive) *"
              />
            </Row>
            <Row mbottom="30px">
              <Field
                name="company"
                type={EFieldTypes.select}
                label={`Company ${
                  formikProps.values.paymentType === EVehicleAccountingVatId.ForcedPayment
                    ? '*'
                    : ''
                }`}
                placeholder="Choose a company"
                options={companies}
              />
            </Row>
            <Row mbottom="30px">
              <Field
                name="agreementNumber"
                type={EInputTypes.text}
                label={`Agreement number ${
                  formikProps.values.paymentType === EVehicleAccountingVatId.ForcedPayment
                    ? '*'
                    : ''
                }`}
                placeholder="Agreement number"
              />
            </Row>
            <Row mbottom="30px">
              <Field
                name="paymentId"
                type={EInputTypes.text}
                placeholder="Payment ID"
                label="Payment ID"
              />
            </Row>
            <Row mbottom="30px">
              <Field
                name="description"
                type={EFieldTypes.textarea}
                height="147px"
                placeholder="Write a description"
                label="Description"
              />
            </Row>
            <Row jc={JustifyContentTypes.flexEnd}>
              <Row componentWidth="204px">
                <Button
                  type={EButtonTypes.submit}
                  onClick={formikProps.handleSubmit}
                  height="50px"
                  componentSize={ComponentSizesTypes.full}
                >
                  <Description
                    fontSize={FontSizeTypes.m}
                    color={colors.white}
                    weight={WeightTypes.w400}
                  >
                    Save
                  </Description>
                </Button>
              </Row>
            </Row>
          </>
        )}
      </Form>
    </Box>
  );
};

export { AddPaymentModal };
