import { useEffect, useState } from 'react';
import {
  IInitialCollectionDelivery,
  IInitialPaymentOrder,
  IInitialPXAddOns,
  IInitialPXSpecification,
  IInitialPXVehicleDataFormValues,
} from 'models/forms';
import { IValuation } from 'models/part-exchange';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { initialPXAddOns } from 'helpers/forms';
import { IAddOrderRequest } from 'models/orders';
import { addOrder } from 'requests/orders';
import { useHistory } from 'react-router-dom';

export interface IAddOrderVehicle {
  id: number;
  registration: string;
  make: string | undefined;
  model: string | undefined;
  modelVariant: string | undefined;
  price: number | null;
}

export interface IAddOrderPartExchange {
  answers: IInitialPXSpecification;
  lookupForm: IInitialPXVehicleDataFormValues;
  valuation: IValuation;
}

export interface IAddOrderData {
  vehicle: IAddOrderVehicle | null;
  partExchange: IAddOrderPartExchange | null;
  extras: IInitialPXAddOns | null;
  collectionDelivery: IInitialCollectionDelivery | null;
  payment: IInitialPaymentOrder | null;
  websiteUserId: number | null;
  websiteUser: IWebsiteUserDetails | null;
}

export enum PaymentType {
  Finance = 1,
  CardPayment = 2,
}

export enum OrderType {
  Delivery = 'DELIVERY',
  Collection = 'COLLECTION',
}

export const useAddOrder = () => {
  const [vehicle, setVehicle] = useState<IAddOrderVehicle | null>(null);
  const [websiteUserId, setWebsiteUserId] = useState<number | null>(null);
  const [websiteUser, setWebsiteUser] = useState<IWebsiteUserDetails | null>(null);
  const [partExchange, setPartExchange] = useState<IAddOrderPartExchange | null>(null);
  const [extras, setExtras] = useState<IInitialPXAddOns | null>(null);
  const [collectionDelivery, setCollectionDelivery] =
    useState<IInitialCollectionDelivery | null>(null);
  const [payment, setPayment] = useState<IInitialPaymentOrder | null>(null);
  const history = useHistory();

  const getOrderData = (): IAddOrderData => ({
    vehicle,
    websiteUserId,
    websiteUser,
    partExchange,
    extras,
    collectionDelivery,
    payment,
  });

  const calculatePrices = (): [number, number] => {
    const vehiclePrice = vehicle && vehicle?.price ? vehicle?.price : 0;
    let totalPrice = 0;
    if (payment?.deposit) {
      totalPrice = 49;
    } else {
      totalPrice += vehiclePrice;
      if (extras) {
        totalPrice +=
          typeof extras?.paintProtectionPrice === 'number' ? extras?.paintProtectionPrice : 0;
        totalPrice += typeof extras?.warrantyPrice === 'number' ? extras?.warrantyPrice : 0;
        totalPrice +=
          typeof extras?.gapInsurancePrice === 'number' ? extras?.gapInsurancePrice : 0;
      }
    }

    return [vehiclePrice, totalPrice];
  };

  const getExtrasPayload = () => {
    const orderExtras: { id: number | string; currentPrice: number | string }[] = [];

    const extrasItems: [keyof typeof initialPXAddOns, keyof typeof initialPXAddOns][] = [
      ['warranty', 'warrantyPrice'],
      ['paintProtection', 'paintProtectionPrice'],
      ['gapInsurance', 'gapInsurancePrice'],
    ];

    extrasItems.forEach((item) => {
      if (typeof extras?.[item[0]] === 'number' && typeof extras?.[item[1]] === 'number') {
        orderExtras.push({
          id: extras[item[0]],
          currentPrice: extras[item[1]],
        });
      }
    });

    return orderExtras;
  };

  const prepareAddOrderPayload = (): IAddOrderRequest => {
    const [vehiclePrice, totalPrice]: [number, number] = calculatePrices();

    let collectionPlace = 0;
    if (collectionDelivery?.collectionLondon) {
      collectionPlace = 1;
    } else if (collectionDelivery?.collectionCorby) {
      collectionPlace = 3;
    }

    return {
      vehicleId: vehicle?.id ?? null,
      websiteUserId: websiteUser?.id ?? null,
      postCodeId: websiteUser?.postCode?.id ?? null,
      deliveryAddress1: websiteUser?.address1 ?? null,
      deliveryAddress2: websiteUser?.address2 ?? null,
      countyId: websiteUser?.county?.id ?? null,
      townId: websiteUser?.town?.id ?? null,
      phone: websiteUser?.mobilePhone ?? null,
      paymentTypeId: payment?.finance ? PaymentType.Finance : PaymentType.CardPayment,
      paymentStatusId: 1, // pending
      partExchangeId: partExchange?.valuation?.partExchangeId ?? null,
      vehiclePrice,
      totalPrice,
      orderStatusId: 2, // awaiting payment
      type: collectionDelivery?.delivery ? OrderType.Delivery : OrderType.Collection,
      orderExtrasIds: getExtrasPayload(),
      collectionPlace,
      reservation: !!payment?.deposit,
      deliveryAddressNote: collectionDelivery?.note ?? '',
    };
  };

  const createOrder = async () => {
    const request = prepareAddOrderPayload();

    try {
      await addOrder(request);
      history.push(`/customer-details/${websiteUserId}/orders`);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (payment && vehicle?.id && websiteUser?.id) {
      createOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  return {
    setVehicle,
    setWebsiteUserId,
    websiteUserId,
    setWebsiteUser,
    websiteUser,
    setPartExchange,
    setExtras,
    setCollectionDelivery,
    setPayment,
    getOrderData,
  };
};
