import React, { ReactElement } from 'react';
import {
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';

const NoData = (): ReactElement => (
  <Row jc={JustifyContentTypes.center} padding="20px 0 50px 0">
    <Description
      fontFamily={EFontFamilies.bree}
      fontSize={FontSizeTypes.l}
      color={colors.black}
      opacity={0.4}
      textAlign={AlignTextTypes.center}
    >
      Sorry, there is no data to display
    </Description>
  </Row>
);

export { NoData };
