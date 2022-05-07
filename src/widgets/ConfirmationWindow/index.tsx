import React from 'react';
import { Row, Column } from 'ui/Layout';
import { Button } from 'ui/Button';
import questionMark from 'assets/images/question-mark.png';
import { JustifyContentTypes, AlignItemsTypes } from 'models/layout';
import { useModal } from 'widgets/Modal/context';
import { colors } from 'styles/colors';
import { EButtonsVariants } from 'models/button';
import { StyledDescription, StyledImageQuestionMark } from './styles';

/**
 * @constructor
 */
const ConfirmationWindow = () => {
  const { closeModal, options } = useModal();
  return (
    <Column
      componentWidth="548px"
      componentHeight="351px"
      bg={colors.white}
      borderRadius="10px"
    >
      <Row
        componentHeight="40%"
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
        ptop="60px"
      >
        <StyledImageQuestionMark src={questionMark} />
      </Row>
      <Row
        componentHeight="30%"
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
        pright="20px"
        pleft="20px"
      >
        <StyledDescription color={colors.black}>
          {options.text || 'Are you sure about this?'}
        </StyledDescription>
      </Row>
      <Row componentHeight="20%" jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
        <Column componentWidth="50%">
          <Button
            onClick={options.confirmButtonAction ? options.confirmButtonAction : () => {}}
            mleft="auto"
            mright="15px"
          >
            {options.confirmButtonText || 'OK'}
          </Button>
        </Column>
        <Column componentWidth="50%">
          <Button onClick={closeModal} mleft="15px" variant={EButtonsVariants.info}>
            {options.closeButtonText || 'Close'}
          </Button>
        </Column>
      </Row>
    </Column>
  );
};

export { ConfirmationWindow };
