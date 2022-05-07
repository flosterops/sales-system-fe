import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from 'ui/Box';
import { Row } from 'ui/Layout';
import { Form } from 'widgets/Form';
import {
  AlignItemsTypes,
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Title, TitleTags } from 'ui/Title';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { FormikProps } from 'formik';
import { initialFormValues } from 'helpers/forms';
import { EInputTypes, IInitialSearchFormValues } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Button } from 'ui/Button';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { ImagesTypes, IVehicle } from 'models/vehicles';
import { getVehicles, getVehicleImages, getVehicle } from 'requests/vehicles';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isRequired } from 'widgets/Form/validations';
import { isResponseError } from 'models/guards';
import { getImagePath, setImagesPaths } from 'helpers/images';
import { AddOrderSteps } from 'models/orders';
import { useQuery } from 'helpers/use-query';
import { getWebsiteUser } from 'requests/website-user';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { VehiclePreview } from './VehiclePreview';
import { IAddOrderVehicle } from '../hooks';

interface IFindVehicle {
  setCurrentStep(arg0: AddOrderSteps): void;
  setVehicleData(arg0: IAddOrderVehicle): void;
  setWebsiteUser(arg0: IWebsiteUserDetails): void;
}

const vehiclesDashboardRequestData = {
  criteria: {
    vrm: '',
  },
  page: {
    pageNumber: 0,
    pageSize: 10,
  },
};

const FindVehicle = ({
  setCurrentStep,
  setVehicleData,
  setWebsiteUser,
}: IFindVehicle): ReactElement => {
  const query = useQuery();
  const vehicleIdQuery = query.get('vehicleId');
  const userIdQuery = query.get('userId');

  const [vehicle, setVehicle] = useState<IVehicle | null>(null);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [vehicleImage, setVehicleImage] = useState<string>();

  const handleSubmit = async ({ search }: IInitialSearchFormValues) => {
    setNoResult(false);
    const token = Cookies.get(ECookiesTypes.accessToken);
    if (token) {
      vehiclesDashboardRequestData.criteria.vrm = search;
      const vehicleData = await getVehicles(token, vehiclesDashboardRequestData);

      if (vehicleData && !vehicleData?.data?.content?.length) {
        setNoResult(true);
      } else if (vehicleData?.data?.content?.[0]) {
        const data = vehicleData?.data?.content?.[0];

        const imagesData = await getVehicleImages(token, data.id);
        if (!isResponseError(imagesData)) {
          const image = imagesData?.data?.[ImagesTypes.IMAGES]?.[0]?.fileName;
          setVehicleImage(image ? getImagePath(image, { width: 800 }) : '');
        }

        setVehicle(data);
        setVehicleData({
          id: data.id,
          registration: data.registration,
          make: data?.make?.name,
          model: data?.model?.name,
          modelVariant: data?.modelVariant,
          price: data?.price,
        });
      }
    }
  };

  const fetchVehicleData = async (id: string) => {
    setNoResult(false);
    const token = Cookies.get(ECookiesTypes.accessToken);
    if (token) {
      try {
        const [vehicleResponse, vehicleImageResponse] = await Promise.all([
          getVehicle(token, id),
          getVehicleImages(token, id),
        ]);
        if (!isResponseError(vehicleResponse) && !isResponseError(vehicleImageResponse)) {
          setVehicle(vehicleResponse.data);
          initialFormValues.search.search = vehicleResponse.data.registration as string;

          setImagesPaths(vehicleImageResponse.data);

          const image = vehicleImageResponse?.data?.[ImagesTypes.IMAGES]?.[0]?.fileName;
          setVehicleImage(image ? getImagePath(image, { width: 800 }) : '');

          setVehicleData({
            id: vehicleResponse.data.id,
            registration: vehicleResponse.data.registration,
            make: vehicleResponse.data?.make?.name,
            model: vehicleResponse.data?.model?.name,
            modelVariant: vehicleResponse.data?.modelVariant,
            price: vehicleResponse.data?.price,
          });
        }
      } catch (e) {
        setVehicle(null);
        console.error(e);
      }
    }
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

  useEffect(() => {
    if (vehicleIdQuery) {
      fetchVehicleData(vehicleIdQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleIdQuery]);

  useEffect(() => {
    if (userIdQuery) {
      getWebsiteUserById(userIdQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdQuery]);

  return (
    <>
      <Box padding="30px 40px 49px" componentWidth="85vw">
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.xl}
        >
          Add Order
        </Title>
        <Row mtop="10px" componentWidth="auto" ai={AlignItemsTypes.flexEnd}>
          <Description fontSize={FontSizeTypes.m} color={colors.textPrimaryThin}>
            Choose a vehicle to create a new order
          </Description>
        </Row>

        <Form
          initialValues={initialFormValues.search}
          onSubmit={handleSubmit}
          componentWidth="100%"
          validations={{
            search: [isRequired()],
          }}
        >
          {(formikProps: FormikProps<IInitialSearchFormValues>): ReactElement => (
            <>
              <Row mbottom="30px" mtop="30px" mleft="15px">
                <Field
                  name="search"
                  type={EInputTypes.text}
                  value={formikProps.values.search}
                  label="VRM"
                />
              </Row>
              <Row jc={JustifyContentTypes.flexEnd}>
                <Row componentWidth="204px">
                  <Button
                    type={EButtonTypes.submit}
                    componentSize={ComponentSizesTypes.full}
                    variant={EButtonsVariants.primary}
                  >
                    <Description
                      color={colors.white}
                      fontSize={FontSizeTypes.xm}
                      weight={WeightTypes.w800}
                    >
                      Search
                    </Description>
                  </Button>
                </Row>
              </Row>
            </>
          )}
        </Form>
        {noResult && (
          <Row>
            <Description weight={WeightTypes.w700} color={colors.error}>
              No vehicle found!
            </Description>
          </Row>
        )}
        {vehicle && (
          <>
            <Row jc={JustifyContentTypes.center}>
              <VehiclePreview vehicle={vehicle} image={vehicleImage} />
            </Row>
            <Row jc={JustifyContentTypes.flexEnd}>
              <Row componentWidth="204px">
                <Button
                  type={EButtonTypes.button}
                  componentSize={ComponentSizesTypes.full}
                  onClick={() => vehicle && setCurrentStep(AddOrderSteps.findCustomer)}
                >
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
      </Box>
    </>
  );
};

export { FindVehicle };
