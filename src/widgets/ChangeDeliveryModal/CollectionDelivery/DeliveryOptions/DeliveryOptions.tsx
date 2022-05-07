import { useFormikContext } from 'formik';
import { EFieldTypes, IInitialCollectionDelivery } from 'models/forms';
import { WeightTypes } from 'models/layout';
import React, { useEffect } from 'react';
import { Row, Column } from 'ui/Layout';
import { Title, TitleTags } from 'ui/Title';
import { Field } from 'widgets/Form/Field';
import { Delivery, DeliveryOption } from '..';
import { AddressDescription, DeliveryOptionsGrid } from './styles';

interface IDeliveryOptions {
  deliveryOptions: DeliveryOption[];
  deliveryKeys: string[];
  currentDelivery?: Delivery;
}

const DeliveryOptions = ({
  deliveryOptions,
  deliveryKeys,
  currentDelivery,
}: IDeliveryOptions) => {
  const formikProps = useFormikContext<IInitialCollectionDelivery>();

  const toggle = (fieldName: string) => {
    const fields = deliveryKeys;
    fields.forEach((field) => {
      formikProps.setFieldValue(field, field === fieldName);
    });
  };

  const getInitialValues = () => {
    if (deliveryOptions.length > 0) {
      let initialDeliveryOptionId;
      if (deliveryOptions) {
        switch (currentDelivery?.id) {
          case '1': {
            initialDeliveryOptionId = deliveryOptions.find((option) =>
              option.address.includes('Stratford'),
            )?.id;
            break;
          }
          case '3': {
            initialDeliveryOptionId = deliveryOptions.find((option) =>
              option.address.includes('Corby'),
            )?.id;
            break;
          }
          case 'home': {
            initialDeliveryOptionId = 'home';
            break;
          }
          default: {
            break;
          }
        }
      }
      formikProps.setFieldValue(initialDeliveryOptionId || '', true);
      formikProps.setFieldValue('note', currentDelivery?.deliveryAddressNote);
    }
  };

  useEffect(() => {
    getInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDelivery]);

  return (
    <DeliveryOptionsGrid margin="30px 0">
      {deliveryOptions.map((option) => (
        <Row>
          <Column componentWidth="50px">
            <Field
              name={option.id}
              type={EFieldTypes.checkbox}
              value={formikProps.values[option.id]}
              onChange={() => {
                toggle(option.id);
              }}
            />
          </Column>
          <Column>
            <Title tagName={TitleTags.h6} weight={WeightTypes.w700}>
              {option.name}
            </Title>
            <AddressDescription>{option.address}</AddressDescription>
          </Column>
        </Row>
      ))}
    </DeliveryOptionsGrid>
  );
};

export { DeliveryOptions };
