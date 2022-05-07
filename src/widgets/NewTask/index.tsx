import React from 'react';
import { Row, Column } from 'ui/Layout';
import { Button } from 'ui/Button';
import markList from 'assets/images/mark-list.png';
import { JustifyContentTypes, AlignItemsTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { useModal } from 'widgets/Modal/context';
import { StyledDescription, StyledImageQuestionMark, StyledTitle } from './styles';

const NewTaskComponent = () => {
  const { options } = useModal();

  return (
    <Column
      componentWidth="548px"
      componentHeight="421px"
      bg={colors.white}
      borderRadius="10px"
    >
      <Row
        componentHeight="40%"
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
        ptop="60px"
      >
        <StyledImageQuestionMark src={markList} />
      </Row>
      <Row
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
        pright="70px"
        pleft="70px"
        style={{ display: 'flow-root', textAlign: 'center' }}
      >
        <StyledTitle color={colors.black} mtop="20px" mbottom="8px">
          New task has been found
        </StyledTitle>
        <StyledDescription color={colors.black}>
          Please click on the accept button to assign it to you and see the task details.
        </StyledDescription>
      </Row>
      <Row componentHeight="20%" jc={JustifyContentTypes.center} ai={AlignItemsTypes.flexEnd}>
        <Column>
          <Button onClick={() => options.confirmButtonAction()} margin="auto">
            Accept
          </Button>
        </Column>
      </Row>
    </Column>
  );
};

export { NewTaskComponent };
