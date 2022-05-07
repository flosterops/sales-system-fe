import React, { PropsWithChildren, ReactElement } from 'react';
import { ILayout, Row } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { GadgetsContainerWrapper } from './styles';

const GadgetsWrapper = ({ children, ...props }: PropsWithChildren<ILayout>): ReactElement => (
  <GadgetsContainerWrapper
    jc={JustifyContentTypes.center}
    ai={AlignItemsTypes.center}
    {...props}
  >
    <Row jc={JustifyContentTypes.center} ai={AlignItemsTypes.center} wrap={props.wrap}>
      {children}
    </Row>
  </GadgetsContainerWrapper>
);

export { GadgetsWrapper };
