import React, { ReactElement, useState } from 'react';
import { Box } from 'ui/Box';
import { Title, TitleTags } from 'ui/Title';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Column, Row } from 'ui/Layout';
import { Form } from 'widgets/Form';
import { FormikProps } from 'formik';
import { initialFormValues } from 'helpers/forms';
import {
  EInputTypes,
  IInitialPXSpecification,
  IInitialPXVehicleDataFormValues,
} from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Button } from 'ui/Button';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { isRequired } from 'widgets/Form/validations';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getValuation, getVehicleLookup } from 'requests/part-exchange';
import {
  IValuation,
  IValuationResponse,
  IVehicleLookup,
  IVehicleLookupResponse,
} from 'models/part-exchange';
import { prepareValuationForm } from 'helpers/part-exchange';
import { priceFormatter } from 'helpers/price-format';
import { AddOrderSteps } from 'models/orders';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { PxVehiclePreview } from './PXVehiclePreview';
import { PXVehicleSpecification } from './PXVehicleSpecification';

interface IPXVehicleData {
  setCurrentStep(arg0: AddOrderSteps): void;
  setPartExchangeData(arg0: any): void;
  websiteUser: IWebsiteUserDetails | null;
}

const PXVehicleData = ({
  setCurrentStep,
  setPartExchangeData,
  websiteUser,
}: IPXVehicleData) => {
  const [data, setData] = useState<IVehicleLookup | null>(null);
  const [noVehicleFound, setNoVehicleFound] = useState<boolean>(false);
  const [lookupForm, setLookupForm] = useState<IInitialPXVehicleDataFormValues>({
    vrm: '',
    mileage: '',
  });
  const [valuationData, setValuationData] = useState<IValuation | null | undefined>(undefined);

  const handleSubmitLookup = async ({ vrm, mileage }: IInitialPXVehicleDataFormValues) => {
    setLookupForm({ vrm, mileage });
    const token = Cookies.get(ECookiesTypes.accessToken);
    if (token) {
      setNoVehicleFound(false);
      const response = await getVehicleLookup(token, vrm);
      if (response === null) {
        setNoVehicleFound(true);
        return;
      }

      setData((response as IVehicleLookupResponse).data);
    }
  };

  const handleSubmitValuation = async (values: IInitialPXSpecification) => {
    const token = Cookies.get(ECookiesTypes.accessToken);
    if (token && websiteUser) {
      const response = await getValuation(
        token,
        prepareValuationForm(values, lookupForm, websiteUser),
      );
      if (response === null) {
        setValuationData(null);
        return;
      }

      const valuation = (response as IValuationResponse).data;
      setValuationData(valuation);
      setPartExchangeData({
        answers: values,
        lookupForm,
        valuation,
      });
    }
  };

  return (
    <>
      <Box padding="30px 40px 49px" componentWidth="75vw">
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.xl}
        >
          Part Exchange
        </Title>

        <Form
          initialValues={initialFormValues.addOrderPXVehicleData}
          onSubmit={handleSubmitLookup}
          validations={{
            vrm: [isRequired()],
            mileage: [isRequired()],
          }}
          componentWidth="100%"
        >
          {(formikProps: FormikProps<IInitialPXVehicleDataFormValues>): ReactElement => (
            <>
              <Row mbottom="30px" mtop="30px" mleft="15px">
                <Field
                  name="vrm"
                  type={EInputTypes.text}
                  value={formikProps.values.vrm}
                  label="VRM"
                  spaces={{ padding: '5px 15px' }}
                />
                <Field
                  name="mileage"
                  type={EInputTypes.number}
                  value={formikProps.values.mileage}
                  label="Mileage"
                  spaces={{ padding: '5px 15px' }}
                />
              </Row>
              {noVehicleFound && (
                <Row mtop="20px">
                  <Description color={colors.error} weight={WeightTypes.w800}>
                    No vehicle found for provided VRM
                  </Description>
                </Row>
              )}
              {!data && (
                <Row jc={JustifyContentTypes.spaceBetween}>
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
                      Check vehicle
                    </Description>
                  </Button>
                </Row>
              )}
            </>
          )}
        </Form>
        {data && (
          <>
            <PxVehiclePreview vehicle={data} />
            <PXVehicleSpecification
              setCurrentStep={setCurrentStep}
              handleSubmit={handleSubmitValuation}
            />
            {valuationData && (
              <>
                <Column>
                  <Title
                    tagName={TitleTags.h2}
                    weight={WeightTypes.w800}
                    fontSize={FontSizeTypes.l}
                  >
                    Valuation
                  </Title>
                  <Description
                    weight={WeightTypes.w700}
                    fontSize={FontSizeTypes.l}
                    color={colors.turquoise}
                  >
                    {priceFormatter(valuationData.vehicleValuation as number)}
                  </Description>
                  <Description weight={WeightTypes.w700} mtop="20px">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Description>
                  <Description>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam
                    aliquid asperiores aspernatur autem consequatur corporis ducimus
                    exercitationem hic, maiores nesciunt non officiis, pariatur perferendis
                    reprehenderit, sapiente soluta voluptate voluptates!
                  </Description>
                  <Description weight={WeightTypes.w700} mtop="20px">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Description>
                  <Description>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam
                    aliquid asperiores aspernatur autem consequatur corporis ducimus
                    exercitationem hic, maiores nesciunt non officiis, pariatur perferendis
                    reprehenderit, sapiente soluta voluptate voluptates!
                  </Description>
                </Column>
                <Row jc={JustifyContentTypes.spaceBetween} mtop="30px">
                  <Button
                    type={EButtonTypes.button}
                    componentSize={ComponentSizesTypes.l}
                    variant={EButtonsVariants.turquoise}
                    onClick={() => {
                      setPartExchangeData(null);
                      setCurrentStep(AddOrderSteps.addOns);
                    }}
                  >
                    <Description
                      color={colors.white}
                      fontSize={FontSizeTypes.xm}
                      weight={WeightTypes.w800}
                    >
                      Continue without my valuation
                    </Description>
                  </Button>
                  <Button
                    type={EButtonTypes.submit}
                    componentSize={ComponentSizesTypes.l}
                    onClick={() => {
                      setCurrentStep(AddOrderSteps.addOns);
                    }}
                  >
                    <Description
                      color={colors.white}
                      fontSize={FontSizeTypes.xm}
                      weight={WeightTypes.w800}
                    >
                      Continue with my valuation
                    </Description>
                  </Button>
                </Row>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export { PXVehicleData };
