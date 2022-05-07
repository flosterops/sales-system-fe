import React, { ReactElement } from 'react';
import { colors } from 'styles/colors';
import { FontSizeTypes } from 'models/layout';
import { Gadget } from 'ui/Gadget';
import { StyledDescription, StyledHeadDescription, StyledSwitch } from './styles';
import { NewTask } from './NewTask';

const NewTaskWidget: React.FC = (): ReactElement => (
  <Gadget
    componentHeight="300px"
    flex="1 3 calc(33% - 10px)"
    bg={colors.primary}
    padding="20px"
  >
    <StyledHeadDescription fontSize={FontSizeTypes.xm} color={colors.white} mbottom="10px">
      You don&apos;t have any task assigned to you yet.
    </StyledHeadDescription>
    <StyledDescription
      fontSize={FontSizeTypes.s}
      color={colors.white}
      opacity={0.4}
      mtop="10px"
    >
      Please click on the button to find a new one.
    </StyledDescription>
    <StyledSwitch>
      <NewTask />
    </StyledSwitch>
  </Gadget>
);

export { NewTaskWidget };
