import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { Column, Row } from 'ui/Layout';
import { JustifyContentTypes, WeightTypes } from 'models/layout';
import { EButtonsVariants } from 'models/button';
import { colors } from 'styles/colors';
import { EInputTypes } from 'models/forms';
import { conditions } from 'helpers/part-exchange';
import { Title, TitleTags } from 'ui/Title';
import { HiddenField, ConditionButton } from './styles';

const PxVehicleCondition = ({ formikProps }: any) => {
  const [vehicleCondition, setVehicleCondition] = useState<number | null>(null);
  const { setFieldValue } = useFormikContext();

  const setCondition = (value: number) => {
    setVehicleCondition(value as number);
    setFieldValue('condition', value);
  };

  return (
    <Column padding="30px 0" componentWidth="50%">
      <Title tagName={TitleTags.h6} weight={WeightTypes.w700} mbottom="10px">
        Choose condition:
      </Title>
      <Row jc={JustifyContentTypes.spaceBetween}>
        {conditions.map((condition) => (
          <ConditionButton
            key={condition.value}
            variant={
              vehicleCondition === condition.value
                ? EButtonsVariants.primary
                : EButtonsVariants.white
            }
            color={colors.black}
            onClick={() => setCondition(condition.value)}
          >
            {condition.label}
          </ConditionButton>
        ))}
      </Row>
      <HiddenField
        name="condition"
        type={EInputTypes.text}
        value={formikProps.values.condition}
      />
    </Column>
  );
};

export { PxVehicleCondition };
