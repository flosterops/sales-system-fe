import React from 'react';
import { Title, TitleTags } from 'ui/Title';
import { AlignItemsTypes, EFontFamilies, FontSizeTypes } from 'models/layout';
import { Loader } from 'ui/Loader';
import { colors } from 'styles/colors';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import TaskDetailsContent from './TaskDetailsContent';
import { TaskDetailsHeader } from './styles';
import { useTaskDetails } from './hooks';

const TaskDetails = () => {
  const { isLoading, taskData, orderInfo, customerInfo, setCustomerInfo } = useTaskDetails();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TaskDetailsHeader mbottom="14px" ai={AlignItemsTypes.center}>
        <Icon
          type={EIconTypes.exclamationCircle}
          fontSize="40px"
          color={colors.white}
          mright="24px"
        />
        {!!taskData?.taskDisplayName && (
          <Title
            tagName={TitleTags.h3}
            fontSize={FontSizeTypes.l}
            fontFamily={EFontFamilies.bree}
            color={colors.white}
          >
            {taskData?.taskDisplayName}
          </Title>
        )}
      </TaskDetailsHeader>
      <TaskDetailsContent
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        orderInfo={orderInfo}
        taskType={taskData?.typeKey}
      />
    </>
  );
};

export { TaskDetails };
