import React, { ReactElement, useState } from 'react';
import { Header } from 'widgets/Header';
import { Column } from 'ui/Layout';
import { AlignItemsTypes } from 'models/layout';
import { AddOrderSteps } from 'models/orders';
import { CollectionDelivery } from './CollectionDelivery';
import { FindVehicle } from './FindVehicle';
import { FindCustomer } from './FindCustomer';
import { PXVehicleData } from './PXVehcileData';
import { AddOns } from './AddOns';
import { AddOrderWizard } from './AddOrderWizard';
import { useAddOrder } from './hooks';
import { Payment } from './Payment';

const AddOrderPage = (): ReactElement => {
  const [currentStep, setCurrentStep] = useState(AddOrderSteps.findVehicle);
  const {
    setVehicle,
    setWebsiteUserId,
    websiteUser,
    setWebsiteUser,
    setPartExchange,
    setExtras,
    setCollectionDelivery,
    setPayment,
    getOrderData,
  } = useAddOrder();
  return (
    <>
      <Header />
      <AddOrderWizard currentStep={currentStep} />
      <Column ai={AlignItemsTypes.center} padding="40px">
        {/* eslint-disable-next-line consistent-return */}
        {(() => {
          switch (currentStep) {
            case AddOrderSteps.findVehicle:
              return (
                <FindVehicle
                  setCurrentStep={setCurrentStep}
                  setVehicleData={setVehicle}
                  setWebsiteUser={setWebsiteUser}
                />
              );
            case AddOrderSteps.findCustomer:
              return (
                <FindCustomer
                  setCurrentStep={setCurrentStep}
                  setWebsiteUserId={setWebsiteUserId}
                  websiteUser={websiteUser}
                  setWebsiteUser={setWebsiteUser}
                />
              );
            case AddOrderSteps.partExchange:
              return (
                <PXVehicleData
                  setCurrentStep={setCurrentStep}
                  setPartExchangeData={setPartExchange}
                  websiteUser={websiteUser}
                />
              );
            case AddOrderSteps.addOns:
              return (
                <AddOns
                  setCurrentStep={setCurrentStep}
                  setExtras={setExtras}
                  orderData={getOrderData()}
                />
              );
            case AddOrderSteps.collectionDelivery:
              return (
                <CollectionDelivery
                  setCurrentStep={setCurrentStep}
                  setCollectionDelivery={setCollectionDelivery}
                  orderData={getOrderData()}
                />
              );
            case AddOrderSteps.payment:
              return <Payment setPayment={setPayment} />;
            default:
              return null;
          }
        })()}
      </Column>
    </>
  );
};
export { AddOrderPage };
