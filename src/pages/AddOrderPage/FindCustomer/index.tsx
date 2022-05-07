import React, { ReactElement, useState } from 'react';
import { Box } from 'ui/Box';
import { Title, TitleTags } from 'ui/Title';
import {
  AlignItemsTypes,
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { FormikProps } from 'formik';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { initialFormValues } from 'helpers/forms';
import { EFieldTypes, IInitialAddCustomerFormValues } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { Form } from 'widgets/Form';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import Cookies from 'js-cookie';
import { getWebsiteUser, getWebsiteUserByPhrase } from 'requests/website-user';
import { ECookiesTypes } from 'models/cookies';
import { isRequired } from 'widgets/Form/validations';
import { AddOrderSteps } from 'models/orders';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { isResponseError } from 'models/guards';
import { CommonLoader } from 'widgets/LoaderComponent/loader';

interface IFindCustomer {
  setCurrentStep(arg0: AddOrderSteps): void;
  setWebsiteUserId(arg0: number): void;
  websiteUser: IWebsiteUserDetails | null;
  setWebsiteUser(arg0: IWebsiteUserDetails): void;
}

const FindCustomer = ({
  setCurrentStep,
  setWebsiteUserId,
  websiteUser,
  setWebsiteUser,
}: IFindCustomer) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getInitialValues = () => {
    if (websiteUser) {
      return {
        customer: {
          value: websiteUser.id,
          label: `${websiteUser.firstname} ${websiteUser.lastname} (${websiteUser.email})`,
        },
      };
    }

    return initialFormValues.addOrderCustomer;
  };

  const getWebsiteUserById = async (id: string) => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (!token) {
      return;
    }
    const websiteUserData = await getWebsiteUser(token, id);
    if (!isResponseError(websiteUserData)) {
      const { data } = websiteUserData;
      setWebsiteUser(data);
    }
  };

  const handleSubmit = async ({ customer }: IInitialAddCustomerFormValues) => {
    if (customer.value) {
      setLoading(true);
      await getWebsiteUserById(customer.value as string);
      setWebsiteUserId(customer.value as number);
      setLoading(false);
      setCurrentStep(AddOrderSteps.partExchange);
    }
  };

  const findWebsiteUserByPhrase = async (searchValue: string): Promise<unknown[]> => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    const requestData = {
      criteria: {
        phrase: searchValue,
      },
      page: {
        pageNumber: 0,
        pageSize: 50,
      },
    };

    const websiteUserData = await getWebsiteUserByPhrase(token as string, requestData);

    return new Promise((resolve) => {
      if (websiteUserData && websiteUserData?.data?.content?.length) {
        resolve(
          websiteUserData?.data?.content.map((user) => ({
            value: user.id,
            label: `${user.firstname} ${user.lastname} (${user.email})`,
          })),
        );
      } else {
        resolve([]);
      }
    });
  };

  return (
    <>
      <Box padding="30px 40px 49px" componentWidth="85vw">
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.xl}
        >
          Add Customer
        </Title>
        <Row mtop="10px" componentWidth="auto" ai={AlignItemsTypes.flexEnd}>
          <Description fontSize={FontSizeTypes.m} color={colors.textPrimaryThin}>
            Choose a customer from list
          </Description>
        </Row>
        <CommonLoader title="Loading…" show={loading} />
        <Form
          initialValues={getInitialValues()}
          onSubmit={handleSubmit}
          componentWidth="100%"
          validations={{
            customer: [isRequired()],
          }}
        >
          {(formikProps: FormikProps<IInitialAddCustomerFormValues>): ReactElement => (
            <>
              <Row mbottom="30px" mtop="30px" mleft="15px">
                <Field
                  name="customer"
                  type={EFieldTypes.autocomplete}
                  value={formikProps.values.customer}
                  label="Customer"
                  getOptionValue={(value: ISelectOptionsModel) => {
                    formikProps.values.customer = value;
                  }}
                  selectProps={{
                    loadSuggestions: findWebsiteUserByPhrase,
                    symbolsToLoad: 3,
                    cacheOptions: false,
                  }}
                />
              </Row>
              <Row jc={JustifyContentTypes.flexEnd}>
                <Row componentWidth="204px">
                  <Button type={EButtonTypes.submit} componentSize={ComponentSizesTypes.full}>
                    <Description
                      color={colors.white}
                      fontSize={FontSizeTypes.xm}
                      weight={WeightTypes.w800}
                    >
                      Next
                    </Description>
                  </Button>
                </Row>
              </Row>
            </>
          )}
        </Form>
      </Box>
    </>
  );
};

export { FindCustomer };
