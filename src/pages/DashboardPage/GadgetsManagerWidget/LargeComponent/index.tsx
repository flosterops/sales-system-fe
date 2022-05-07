import React, { ReactElement } from 'react';
import { Gadget } from 'ui/Gadget';
import smallImage from 'assets/images/add-gadget-small.png';
import smallBlueImage from 'assets/images/add-gadget-small-blue.png';
import mediumImage from 'assets/images/add-gadget-medium.png';
import mediumBlueImage from 'assets/images/add-gadget-medium-blue.png';
import largeImage from 'assets/images/add-gadget-large.png';
import largeBlueImage from 'assets/images/add-gadget-large-blue.png';
import { colors } from 'styles/colors';
import { AlignItemsTypes, EFontFamilies, JustifyContentTypes } from 'models/layout';
import { Row } from 'ui/Layout';
import { EGadgetSize } from 'models/gadget';
import {
  StyledBreakDescription,
  StyledDescription,
  StyledHeadDescription,
  StyledImage,
} from '../styles';

interface ILargeComponent {
  onClick: (size: EGadgetSize) => void;
}

// TODO: Improve images implementation - All sub components small/medium/large
const LargeComponent = ({ onClick }: ILargeComponent): ReactElement => (
  <Gadget
    componentHeight="300px"
    flex="3 3 100%"
    padding="20px"
    bg={colors.transparent}
    border="4px #c5c5c5 dashed"
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
      <StyledBreakDescription fontFamily={EFontFamilies.bree}>or</StyledBreakDescription>
      <StyledImage
        onClick={() => onClick(EGadgetSize.large)}
        src={largeImage}
        onMouseOver={(e) => {
          e.currentTarget.src = largeBlueImage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = largeImage;
        }}
      />
    </Row>
  </Gadget>
);

export { LargeComponent };
