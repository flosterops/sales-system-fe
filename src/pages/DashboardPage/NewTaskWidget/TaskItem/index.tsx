import React, { ReactElement } from 'react';
import { Description } from 'ui/Description';
import { FontSizeTypes, JustifyContentTypes } from 'models/layout';
import { IBusinessNote, ITaskDetail } from 'store/reducers/task-reducer/types';
import { format } from 'date-fns';
import ReactTooltip from 'react-tooltip';
import { colors } from 'styles/colors';
import { Column } from 'ui/Layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { StyledTaskItem } from './styles';

interface ITaskItemProps {
  item: ITaskDetail;
}

const TaskItem = ({ item }: ITaskItemProps): ReactElement | null => {
  if (!item) {
    return null;
  }

  const date = item.scheduledToTime ? format(new Date(item.scheduledToTime), 'H:mm') : '';
  return (
    <>
      {!!item.businessNotes.length && (
        <ReactTooltip
          backgroundColor={colors.white}
          borderColor={colors.turquoise}
          border
          type="info"
          id={item.id}
          place="top"
          effect="solid"
        >
          <Column>
            {item.businessNotes.map(
              (note: IBusinessNote): ReactElement => (
                <>
                  <Description mleft="-5px" color={colors.black} fontSize={FontSizeTypes.xs}>
                    {note.content}
                  </Description>
                </>
              ),
            )}
          </Column>
        </ReactTooltip>
      )}
      <StyledTaskItem jc={JustifyContentTypes.spaceBetween}>
        <Description fontSize={FontSizeTypes.s}>
          <strong>{date}</strong>
          {' - '}
          <span>{item.taskDisplayName}</span>
        </Description>
        <Icon
          type={EIconTypes.questionCircle}
          color={colors.turquoise}
          fontSize="25px"
          data-tip
          data-for={item.id}
        />
      </StyledTaskItem>
    </>
  );
};

export { TaskItem };
