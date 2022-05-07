import React, { ReactElement, useEffect } from 'react';
import { Description } from 'ui/Description';
import {
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Column, Row } from 'ui/Layout';
import { Gadget } from 'ui/Gadget';
import { useDispatch, useSelector } from 'react-redux';
import { listScheduledTasksForToday } from 'store/reducers/task-reducer/actions';
import { TStore } from 'store';
import { ITaskDetail } from 'store/reducers/task-reducer/types';
import { colors } from 'styles/colors';
import { TaskItem } from '../NewTaskWidget/TaskItem';

const DailyTasksWidget: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const components = useSelector((state: TStore) => state.task);
  const { tasks } = components;
  useEffect(() => {
    dispatch(listScheduledTasksForToday());
  }, [dispatch]);

  return (
    <Gadget componentHeight="300px" flex="1 3 calc(33% - 10px)" padding="20px">
      <Description fontSize={FontSizeTypes.xm}>Your scheduled tasks for today</Description>

      <Column mtop="20px">
        {tasks.map((item: ITaskDetail) => (
          <TaskItem item={item} key={item.id} />
        ))}
        {!tasks.length && (
          <Row jc={JustifyContentTypes.center} mtop="60px" mbottom="36px">
            <Description
              fontFamily={EFontFamilies.bree}
              fontSize={FontSizeTypes.l}
              color={colors.black}
              opacity={0.4}
              textAlign={AlignTextTypes.center}
            >
              Sorry, there is no data to display
            </Description>
          </Row>
        )}
      </Column>
    </Gadget>
  );
};

export { DailyTasksWidget };
