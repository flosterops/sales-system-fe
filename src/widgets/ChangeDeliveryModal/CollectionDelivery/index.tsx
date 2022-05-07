import React, { ReactElement, useEffect, useState } from 'react';
import { Title, TitleTags } from 'ui/Title';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Row } from 'ui/Layout';
import { Box } from 'ui/Box';
import { EFieldTypes, IInitialCollectionDelivery } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Form } from 'widgets/Form';
import { FormikProps } from 'formik';
import { EButtonTypes } from 'models/button';
import { Button } from 'ui/Button';
import { useModal } from 'widgets/Modal/context';
import { IOrder } from 'models/orders';
import { IAvailableDeliveryDatesResponse, IDeliverySlots } from 'models/calendar';
import { getAvailableDeliveryDates, saveDeliveryDate } from 'requests/delivery';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { useCustomerDetailsUser } from 'pages/CustomerDetailsPage/hooks';
import { format, parseISO } from 'date-fns';
import { CollectionDeliveryCalendar } from './CollectionDeliveryCalendar/CollectionDeliveryCalendar';
import { DeliveryOptions } from './DeliveryOptions/DeliveryOptions';

export enum TimeOfDay {
  am = 'am',
  pm = 'pm',
}

export interface ISelectedDate {
  date: string | null;
  timeOfDay: TimeOfDay | null;
}

export type Delivery = {
  id: string;
  deliveryAddressNote: string | null;
  deliveryTime: string;
  deliveryPeriod: TimeOfDay;
};

export type DeliveryOption = {
  id: string;
  name: string;
  address: string;
};

const CollectionDelivery = (): ReactElement => {
  const {
    options: { activeOrder },
    closeModal,
  } = useModal();

  const token = Cookies.get(ECookiesTypes.accessToken);

  const [orderDeliver, setOrderDelivery] = useState<Delivery>();
  const [deliverySlots, setDeliverySlots] = useState<IDeliverySlots>();
  const { user } = useCustomerDetailsUser(activeOrder.id as string);

  const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
    date: null,
    timeOfDay: null,
  });

  const generateDeliveryOptions = (): {
    deliveryOptions: DeliveryOption[];
    deliveryKeys: string[];
  } => {
    const deliveryOptions = [];
    if (deliverySlots?.pickupBranches && user) {
      deliverySlots?.pickupBranches.forEach((branch) => {
        deliveryOptions.push({
          id: branch.branchId.toString(),
          name: branch.branchName,
          address: branch.branchAddress.replace('\n\n', '\n'),
        });
      });
      deliveryOptions.push({
        id: 'home',
        name: `Home Delivery ${user.firstname} ${user.lastname}`,
        address: `${user.town.name}${user.address1}${
          user.address2 ? `\n${user.address2}` : ''
        }\n${user.postCode.postcode}`,
      });
    }
    const deliveryKeys = deliveryOptions.map((delivery) => delivery.id);
    return { deliveryOptions, deliveryKeys };
  };

  const { deliveryOptions, deliveryKeys } = generateDeliveryOptions();

  const handleSubmit = async (values: IInitialCollectionDelivery) => {
    if (token) {
      const currentActiveOption = deliveryKeys?.find((key) => values[key] === true);
      if (currentActiveOption && selectedDate.date && selectedDate.timeOfDay) {
        const fetchedOrder = activeOrder as IOrder;
        const homeDelivery = currentActiveOption === 'home';
        const parsedDate = parseISO(selectedDate.date).toISOString();
        await saveDeliveryDate(token, fetchedOrder.id, {
          slot: {
            deliveryDay: parsedDate,
            partOfTheDay: selectedDate.timeOfDay.toLocaleUpperCase(),
          },
          homeDelivery,
          branchId: homeDelivery ? null : parseInt(currentActiveOption, 10),
        });
      }
      closeModal();
    }
  };

  useEffect(() => {
    (async function handleDataInit() {
      const fetchedOrder = activeOrder as IOrder;

      if (!token) {
        return;
      }

      try {
        const response = (await getAvailableDeliveryDates(
          token,
          fetchedOrder.id,
        )) as IAvailableDeliveryDatesResponse;
        setDeliverySlots(response.data);
      } catch (err) {
        console.error(err);
      }
      const id =
        fetchedOrder.collectionPlace && fetchedOrder.type === 'COLLECTION'
          ? fetchedOrder.collectionPlace.toString()
          : 'home';

      setOrderDelivery({
        id,
        deliveryAddressNote: fetchedOrder.deliveryAddressNote,
        deliveryTime: format(new Date(fetchedOrder.deliveryTime), 'yyyy-MM-dd'),
        deliveryPeriod:
          new Date(fetchedOrder.deliveryTime).getHours() < 12 ? TimeOfDay.am : TimeOfDay.pm,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrder]);

  return (
    <>
      <Box padding="30px 36px 49px 30px">
        <Title
          tagName={TitleTags.h2}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.xl}
        >
          Delivery
        </Title>

        <Form initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
          {(formikProps: FormikProps<IInitialCollectionDelivery>): ReactElement => (
            <>
              <DeliveryOptions
                currentDelivery={orderDeliver}
                deliveryOptions={deliveryOptions}
                deliveryKeys={deliveryKeys}
              />
              <CollectionDeliveryCalendar
                selectedDate={selectedDate}
                setSelectedDate={(value: ISelectedDate) => setSelectedDate(value)}
                currentDelivery={orderDeliver}
                availableSlots={deliverySlots}
                deliveryKeys={deliveryKeys}
              />
              <Row margin="30px 0">
                <Field
                  name="note"
                  type={EFieldTypes.textarea}
                  value={formikProps.values.note}
                  placeholder="Write a note"
                  height="175px"
                />
              </Row>
              <Row jc={JustifyContentTypes.flexEnd}>
                <Button type={EButtonTypes.submit} componentSize={ComponentSizesTypes.m}>
                  Confirm
                </Button>
              </Row>
            </>
          )}
        </Form>
      </Box>
    </>
  );
};

export { CollectionDelivery };
