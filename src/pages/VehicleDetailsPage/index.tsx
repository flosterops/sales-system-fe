import React, { ReactElement } from 'react';
import { Button } from 'ui/Button';
import { useModal } from 'widgets/Modal/context';
import { Description } from 'ui/Description';
import { EModalTypes } from 'models/modal';
import { Column, Row } from 'ui/Layout';
import {
  AlignItemsTypes,
  ComponentSizesTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Loader } from 'ui/Loader';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { ImagesTypes } from 'models/vehicles';
import { colors } from 'styles/colors';
import { css } from 'styled-components';
import { EIconTypes } from 'models/icons';
import { Link, useHistory } from 'react-router-dom';
import { slugify } from 'helpers/slugify';
import { ERouteLinks } from 'models/route';
import { SearchInput } from '../DashboardPage/SearchInput';
import { useFetchVehicle } from './hooks';
import { NotFoundRedirect } from '../NotFoundPage';
import { Carousel } from '../TaskPage/shared/Carousel';
import {
  StyledBadge,
  StyledInterested,
  StyledStatus,
  VehicleDetailsButtonWrapper,
  VehicleDetailsContainer,
  VehicleDetailsContentWrapper,
} from './styles';
import { DetailsTable } from '../TaskPage/shared/DetailsTable';
import { NoImagePlaceholder } from './NoImagePlaceholder';

const VehicleDetailsPage = (): ReactElement => {
  const { isLoading, vehicle, vehicleImages, interestCount, cancelledOrdersCount } =
    useFetchVehicle();
  const { openModal, closeModal } = useModal();
  const history = useHistory();

  const vehicleWebsiteUrl = `${process.env.REACT_APP_CARZAM_WWW}/used/cars/${
    vehicle?.make.slug
  }/${vehicle?.model.slug}/${slugify(vehicle?.modelVariant)}-${vehicle?.stockId}`;

  if (isLoading) {
    return <Loader />;
  }

  if (vehicle === null) {
    return <NotFoundRedirect />;
  }

  const VehicleStatus = () => {
    if (!vehicle) {
      return null;
    }
    if (vehicle.sold) {
      return <span>Sold</span>;
    }
    return <span>{vehicle.advertise ? 'Advertised' : 'Not advertised'}</span>;
  };

  const interestedModal = () => {
    if (interestCount > 0 && vehicle) {
      return openModal(EModalTypes.InterestedVehicle, {
        id: vehicle.id,
        closeModal,
      });
    }
    return null;
  };

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput />
      </Row>
      {vehicle && (
        <>
          <VehicleDetailsButtonWrapper margin="0 auto 20px">
            <Button
              icon={EIconTypes.leftChevron}
              extraIconCss={css`
                left: 15px;
              `}
              onClick={() => {
                history.goBack();
              }}
            >
              <Description
                weight={WeightTypes.w700}
                color={colors.white}
                fontSize={FontSizeTypes.xm}
              >
                Back
              </Description>
            </Button>
          </VehicleDetailsButtonWrapper>
          <Column ai={AlignItemsTypes.center}>
            <VehicleDetailsContainer padding="30px 40px 49px">
              <Row mbottom="10px">
                <Row mtop="20px">
                  <StyledInterested
                    style={{ cursor: interestCount > 0 ? 'pointer' : 'unset' }}
                    onClick={interestedModal}
                  >
                    Interested
                    <StyledBadge color={colors.turquoise}>{interestCount}</StyledBadge>
                  </StyledInterested>
                  <StyledInterested>
                    Cancelled<StyledBadge>{cancelledOrdersCount}</StyledBadge>
                  </StyledInterested>
                </Row>
                <Row mtop="20px" jc={JustifyContentTypes.flexEnd}>
                  <StyledStatus>
                    Vehicle status: <VehicleStatus />
                  </StyledStatus>
                </Row>
              </Row>
              <VehicleDetailsContentWrapper>
                <Column ai={AlignItemsTypes.flexStart}>
                  {vehicleImages?.[ImagesTypes.IMAGES].length ? (
                    <Carousel items={vehicleImages[ImagesTypes.IMAGES]} />
                  ) : (
                    <NoImagePlaceholder />
                  )}
                  <Row>
                    <Button
                      componentSize={ComponentSizesTypes.full}
                      onClick={() =>
                        vehicle &&
                        openModal(EModalTypes.VehicleAssignCustomer, {
                          id: vehicle.id,
                          registration: vehicle.registration,
                        })
                      }
                    >
                      <Description
                        weight={WeightTypes.w800}
                        color={colors.white}
                        fontSize={FontSizeTypes.xm}
                      >
                        Add interests
                      </Description>
                    </Button>
                  </Row>
                  <Row jc={JustifyContentTypes.spaceBetween} margin="15px 0">
                    <Button>
                      <Description
                        weight={WeightTypes.w800}
                        color={colors.white}
                        fontSize={FontSizeTypes.xm}
                      >
                        Add Task
                      </Description>
                    </Button>
                    <Button
                      disabled={!vehicle.advertise || vehicle.sold}
                      onClick={() =>
                        history.push(`${ERouteLinks.addOrder}?vehicleId=${vehicle?.id}`)
                      }
                    >
                      <Description
                        weight={WeightTypes.w800}
                        color={colors.white}
                        fontSize={FontSizeTypes.xm}
                      >
                        Sell this vehicle
                      </Description>
                    </Button>
                  </Row>
                  <Row>
                    <Button componentSize={ComponentSizesTypes.full}>
                      <Link to={{ pathname: vehicleWebsiteUrl }} target="_blank">
                        <Description
                          weight={WeightTypes.w800}
                          color={colors.white}
                          fontSize={FontSizeTypes.xm}
                        >
                          Show on website
                        </Description>
                      </Link>
                    </Button>
                  </Row>
                </Column>
                <Column ai={AlignItemsTypes.center} mleft="10px">
                  <DetailsTable columnsSize={{ left: 37, right: 63 }} vehicle={vehicle} />
                </Column>
              </VehicleDetailsContentWrapper>
            </VehicleDetailsContainer>
          </Column>
        </>
      )}
    </>
  );
};

export { VehicleDetailsPage };
