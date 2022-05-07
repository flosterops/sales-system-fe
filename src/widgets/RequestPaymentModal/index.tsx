import React, { ReactElement, useState } from 'react';
import { Box } from 'ui/Box';
import { TitleTags } from 'ui/Title';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Form } from 'widgets/Form';
import { FormikProps } from 'formik';
import { Field } from 'widgets/Form/Field';
import { EFieldTypes, EInputTypes, IInitialRequestPaymentFormValues } from 'models/forms';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { initialFormValues } from 'helpers/forms';
import { isRequired } from 'widgets/Form/validations';
import { generatePaymentWithLink } from 'requests/orders';
import { useModal } from 'widgets/Modal/context';
import { Loader } from 'ui/Loader';
import { EVehicleAccountingVatId } from 'models/vehicles';
import { sendEmailMessage } from 'requests/email-message';
import { getWebsiteUserDetails } from 'requests/website-user';
import { mapEmailBody } from 'helpers/messages';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { RequestPaymentTitle } from './styles';
import { messageBody } from './message';

interface IRequestPaymentModal {
  orderId: number;
  websiteUserId: number | string;
}

const RequestPaymentModal = ({
  orderId,
  websiteUserId,
}: IRequestPaymentModal): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useModal();
  const { openNotification } = useNotification();

  const handleSubmit = async (values: IInitialRequestPaymentFormValues) => {
    setIsLoading(true);
    try {
      const paymentLink = await generatePaymentWithLink(orderId, {
        amount: Number(values.amount),
        description: values.description,
        agreementNumber: 'Payment request',
        vehicleAccountType: EVehicleAccountingVatId.PaymentRequest,
      });
      const websiteUserData = await getWebsiteUserDetails(websiteUserId as number);
      await sendEmailMessage({
        recipientTo: websiteUserData.data.email,
        recipientCc: null,
        recipientBcc: null,
        sender: 'noreply@carzam.co.uk',
        subject: 'Carzam - Payment Needed',
        body: mapEmailBody(messageBody, {
          CUSTOMER_FIRST_NAME: websiteUserData.data.firstname,
          description: values.description,
          GENERATED_URL: paymentLink.data,
        }),
        comment: null,
        pageTitle: null,
        pageUrl: paymentLink.data || '',
        websiteUserId: websiteUserId as number,
        trackingData: null,
      });
      closeModal();
      openNotification({
        type: ENotificationTypes.success,
        text: 'Request payment email has been sent successfully',
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box componentWidth="548px" padding="75px 55px 42px">
      <RequestPaymentTitle
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.l}
      >
        Request Payment
      </RequestPaymentTitle>
      <Form
        initialValues={{ ...initialFormValues.requestPayment }}
        onSubmit={handleSubmit}
        validations={{ amount: [isRequired()] }}
      >
        {(formikProps: FormikProps<IInitialRequestPaymentFormValues>): ReactElement => (
          <>
            <Row mbottom="30px">
              <Field
                name="amount"
                type={EInputTypes.text}
                value={formikProps.values.amount}
                placeholder="Amount (Tax inclusive) *"
              />
            </Row>
            <Field
              name="description"
              type={EFieldTypes.textarea}
              value={formikProps.values.description}
              placeholder="Write a description"
              height="147px"
            />
            <Row jc={JustifyContentTypes.flexEnd}>
              <Button
                componentSize={ComponentSizesTypes.m}
                height="50px"
                type={EButtonTypes.submit}
                mtop="30px"
                color={colors.primary}
                onClick={formikProps.handleSubmit}
              >
                <Description
                  color={colors.white}
                  fontSize={FontSizeTypes.m}
                  weight={WeightTypes.w400}
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

export { RequestPaymentModal };
