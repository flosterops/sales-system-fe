import React, { FunctionComponent, ReactElement } from 'react';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { Row } from 'ui/Layout';
import { AlignItemsTypes, WeightTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { StyledCustomerInfoField } from './styles';

interface CustomerInfoFieldProps {
  icon: EIconTypes;
  value: string | number | null;
  highlighted?: boolean | null;
}

const CustomerInfoField: FunctionComponent<CustomerInfoFieldProps> = ({
  icon,
  value,
  highlighted,
  ...props
}): ReactElement => (
  <Row ai={AlignItemsTypes.flexEnd}>
    <Icon type={icon} color={colors.turquoise} />
    <StyledCustomerInfoField
      color={highlighted ? colors.primary : colors.textPrimary}
      fontWeight={highlighted ? WeightTypes.w600 : WeightTypes.default}
    >
      {value || ''}
    </StyledCustomerInfoField>
    {props.children}
  </Row>
);

export { CustomerInfoField };
