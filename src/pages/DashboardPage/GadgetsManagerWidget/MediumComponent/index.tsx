import React, { ReactElement } from 'react';
import { Gadget } from 'ui/Gadget';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { AlignItemsTypes, EFontFamilies, JustifyContentTypes } from 'models/layout';
import smallImage from 'assets/images/add-gadget-small.png';
import smallBlueImage from 'assets/images/add-gadget-small-blue.png';
import mediumImage from 'assets/images/add-gadget-medium.png';
import mediumBlueImage from 'assets/images/add-gadget-medium-blue.png';
import { EGadgetSize } from 'models/gadget';
import {
  StyledBreakDescription,
  StyledDescription,
  StyledHeadDescription,
  StyledImage,
} from '../styles';

interface IMediumComponent {
  onClick: (size: EGadgetSize) => void;
}

const MediumComponent = ({ onClick }: IMediumComponent): ReactElement => (
  <Gadget
    componentHeight="300px"
    flex="2 3 calc(66% - 10px)"
    padding="20px"
    bg={colors.transparent}
    borderRadius="10px"
    border="dashed 4px #c5c5c5"
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
      <StyledBreakDescription fontFamily={EFontFamilies.bree}>or</StyledBreakDescription>
      <StyledImage
        onClick={() => onClick(EGadgetSize.medium)}
        src={mediumImage}
        onMouseOver={(e) => {
          e.currentTarget.src = mediumBlueImage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = mediumImage;
        }}
      />
    </Row>
  </Gadget>
);

export { MediumComponent };
