import React, { ReactElement } from 'react';
import { Gadget } from 'ui/Gadget';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { AlignItemsTypes, EFontFamilies, JustifyContentTypes } from 'models/layout';
import smallImage from 'assets/images/add-gadget-small.png';
import smallBlueImage from 'assets/images/add-gadget-small-blue.png';
import { EGadgetSize } from 'models/gadget';
import { StyledDescription, StyledHeadDescription, StyledImage } from '../styles';

interface ISmallComponent {
  onClick: (size: EGadgetSize) => void;
}

const SmallComponent = ({ onClick }: ISmallComponent): ReactElement => (
  <Gadget
    componentHeight="300px"
    flex="1 3 calc(33% - 10px)"
    padding="20px"
    bg={colors.transparent}
    border="dashed 4px #c5c5c5"
    borderRadius="10px"
    boxShadow="none"
  >
    <Row jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
      <StyledHeadDescription fontFamily={EFontFamilies.bree}>
        Add new gadget
      </StyledHeadDescription>
    </Row>
    <Row jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
      <StyledDescription fontFamily={EFontFamilies.bree}>
        Please choose the option
      </StyledDescription>
    </Row>
    <Row jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
      <StyledImage
        onClick={() => onClick(EGadgetSize.small)}
        src={smallImage}
        onMouseOver={(e) => {
          e.currentTarget.src = smallBlueImage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = smallImage;
        }}
      />
    </Row>
  </Gadget>
);

export { SmallComponent };
