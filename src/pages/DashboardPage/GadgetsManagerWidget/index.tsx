import React, { ReactElement } from 'react';
import { EGadgetSize } from 'models/gadget';
import { LargeComponent } from './LargeComponent';
import { SmallComponent } from './SmallComponent';
import { MediumComponent } from './MediumComponent';

interface IGadgetsManagerWidget {
  size: EGadgetSize;
  onClick: (size: EGadgetSize) => void;
}

const GadgetsManagerWidget = ({ size, onClick }: IGadgetsManagerWidget): ReactElement => {
  switch (size) {
    case EGadgetSize.small:
    default:
      return <SmallComponent onClick={onClick} />;
    case EGadgetSize.medium:
      return <MediumComponent onClick={onClick} />;
    case EGadgetSize.large:
      return <LargeComponent onClick={onClick} />;
  }
};

export { GadgetsManagerWidget };
