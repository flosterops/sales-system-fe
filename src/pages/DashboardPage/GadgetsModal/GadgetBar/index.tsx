import React, { ReactElement } from 'react';
import { Column, Row } from 'ui/Layout';
import addBlueImage from 'assets/images/add-plus-blue.png';
import addGreenImage from 'assets/images/add-plus.png';
import { AlignItemsTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { EGadgetTypes } from 'models/gadget';
import { StyledImg, GadgetName, StyledGadgetBarRow, GadgetBarStyledImage } from './styles';

// TODO: Improve images implementation
const GadgetBar = (props: {
  name: string;
  type: EGadgetTypes;
  image: string;
  onClick: (type: EGadgetTypes) => Promise<void>;
}): ReactElement => (
  <StyledGadgetBarRow
    componentHeight="78px"
    margin="0 9px 10px 0"
    padding="17px 20px 17px 20px"
    borderRadius="10px"
    bg={colors.white}
  >
    <Column>
      <Row ai={AlignItemsTypes.center}>
        <Column componentWidth="40px">
          <GadgetBarStyledImage src={props.image} />
        </Column>
        <Column>
          <GadgetName mleft="29px">{props.name}</GadgetName>
        </Column>
        <Column>
          <StyledImg
            onClick={() => props.onClick(props.type)}
            src={addBlueImage}
            onMouseOut={(e) => {
              e.currentTarget.src = addBlueImage;
            }}
            onMouseOver={(e) => {
              e.currentTarget.src = addGreenImage;
            }}
          />
        </Column>
      </Row>
    </Column>
  </StyledGadgetBarRow>
);

export { GadgetBar };
