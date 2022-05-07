import React, { useEffect } from 'react';
import { Icon } from 'ui/Icon';
import { colors } from 'styles/colors';
import { FormikProps, useFormikContext } from 'formik';
import { Row } from 'ui/Layout';
import { JustifyContentTypes } from 'models/layout';
import { Field } from 'widgets/Form/Field';
import { EFieldTypes, EInputTypes, IInitialPXAddOns } from 'models/forms';
import { EIconTypes } from 'models/icons';
import { OrderExtrasGroups } from 'models/order-extras';
import { ISelectOnChange } from 'widgets/Form/Select';
import { AddOnsFormElementWrapper, AddOnsPriceElementWrapper } from './styles';
import { useOrderExtras } from '../../pages/AddOrderPage/AddOns/hooks';
import { getOrderOrderExtras } from '../../requests/orders';

interface IAddOnsForm {
  formikProps: FormikProps<IInitialPXAddOns>;
  vehiclePrice?: number | null;
  orderId?: number;
}

const AddOnsForm = ({ formikProps, vehiclePrice, orderId }: IAddOnsForm) => {
  const { getExtrasByGroup, getWarrantyPrice, getPaintProtectionPrice } = useOrderExtras();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    (async function getOrderExtras() {
      if (orderId) {
        try {
          const orderExtras = await getOrderOrderExtras(orderId);
          if (orderExtras && orderExtras?.data) {
            orderExtras?.data.map((extras) => {
              if (extras.name.includes('warranty')) {
                setFieldValue('warranty', extras.orderExtraId);
                setFieldValue('warrantyPrice', extras.price);
              } else if (extras.name.includes('protection')) {
                setFieldValue('paintProtection', extras.orderExtraId);
                setFieldValue('paintProtectionPrice', extras.price);
              } else if (extras.name.includes('GAP')) {
                setFieldValue('gapInsurance', extras.orderExtraId);
                setFieldValue('gapInsurancePrice', extras.price);
              }
              return false;
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <>
      <Row jc={JustifyContentTypes.spaceBetween}>
        <AddOnsFormElementWrapper>
          <Field
            name="warranty"
            type={EFieldTypes.select}
            value={formikProps?.values?.warranty}
            label="Car care warranty"
            icon={EIconTypes.shieldAlt}
            options={getExtrasByGroup(OrderExtrasGroups.ExtendedWarranty)}
            onChange={({ target }: ISelectOnChange) => {
              formikProps.setFieldValue('warranty', target.value);
              formikProps.setFieldValue(
                'warrantyPrice',
                target.value ? getWarrantyPrice(target.value as number, vehiclePrice) : '',
              );
            }}
          />
        </AddOnsFormElementWrapper>
        <Icon
          type={EIconTypes.arrowRight}
          color={colors.textPrimary}
          opacity={0.2}
          mtop="8px"
          mleft="25px"
          mright="25px"
          fontSize="28px"
        />
        <AddOnsPriceElementWrapper>
          <Field
            name="warrantyPrice"
            type={EInputTypes.number}
            value={formikProps?.values?.warrantyPrice}
            label="Price"
            icon={EIconTypes.poundSign}
          />
        </AddOnsPriceElementWrapper>
      </Row>
      <Row jc={JustifyContentTypes.spaceBetween}>
        <AddOnsFormElementWrapper>
          <Field
            name="paintProtection"
            type={EFieldTypes.select}
            value={formikProps?.values?.paintProtection}
            label="Paint protection with GardX"
            icon={EIconTypes.umbrella}
            options={getExtrasByGroup(OrderExtrasGroups.PaintProtection)}
            onChange={({ target }: ISelectOnChange) => {
              formikProps.setFieldValue('paintProtection', target.value);
              formikProps.setFieldValue(
                'paintProtectionPrice',
                target.value ? getPaintProtectionPrice() : '',
              );
            }}
          />
        </AddOnsFormElementWrapper>
        <Icon
          type={EIconTypes.arrowRight}
          color={colors.textPrimary}
          opacity={0.2}
          mtop="8px"
          fontSize="28px"
        />
        <AddOnsPriceElementWrapper>
          <Field
            name="paintProtectionPrice"
            type={EInputTypes.number}
            value={formikProps?.values?.paintProtectionPrice}
            label="Price"
            icon={EIconTypes.poundSign}
          />
        </AddOnsPriceElementWrapper>
      </Row>
      <Row jc={JustifyContentTypes.spaceBetween}>
        <AddOnsFormElementWrapper>
          <Field
            name="gapInsurance"
            type={EFieldTypes.select}
            value={formikProps?.values?.gapInsurance}
            label="Free one-month GAP insurance"
            icon={EIconTypes.clipboardCheck}
            options={getExtrasByGroup(OrderExtrasGroups.GAPInsurance)}
            onChange={({ target }: ISelectOnChange) => {
              formikProps.setFieldValue('gapInsurance', target.value);
              formikProps.setFieldValue('gapInsurancePrice', target.value ? 0 : '');
            }}
          />
        </AddOnsFormElementWrapper>
        <Icon
          type={EIconTypes.arrowRight}
          color={colors.textPrimary}
          opacity={0.2}
          mtop="8px"
          fontSize="28px"
        />
        <AddOnsPriceElementWrapper>
          <Field
            name="gapInsurancePrice"
            type={EInputTypes.number}
            value={formikProps?.values?.gapInsurancePrice}
            label="Price"
            icon={EIconTypes.poundSign}
          />
        </AddOnsPriceElementWrapper>
      </Row>
    </>
  );
};

export { AddOnsForm };
