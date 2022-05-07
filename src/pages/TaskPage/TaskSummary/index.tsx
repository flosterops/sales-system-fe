import React, { ReactElement, useEffect, useState } from 'react';
import { Row } from 'ui/Layout';
import { colors } from 'styles/colors';
import {
  AlignItemsTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { EIconTypes } from 'models/icons';
import { getTask, hasToRescheduleUnresolved, hasToResolveTask } from 'requests/task';
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import { ECookiesTypes } from 'models/cookies';
import {
  IInitialTaskSummaryResolvedFormValues,
  IInitialTaskSummaryUnresolvedFormValues,
} from 'models/forms';
import { ERouteLinks } from 'models/route';
import { format } from 'date-fns';
import { ETaskStatuses, ITask } from 'models/task';
import { isResponseError } from 'models/guards';
import { TaskDetailsHeader } from 'widgets/TaskDetails/styles';
import { Title, TitleTags } from 'ui/Title';
import { Loader } from 'ui/Loader';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { CircleButton, CircleButtonIcon, CircleButtonLabel } from './style';
import { UnresolvedForm } from './UnresolvedForm';
import { ResolvedForm } from './ResolvedForm';

type ResolveStatusType = boolean;

const TaskSummary = (): ReactElement => {
  const [resolveStatus, setResolveStatus] = useState<ResolveStatusType>(true);
  const [taskData, setTaskData] = useState<ITask>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams() as { id: string };
  const history = useHistory();
  const { openNotification } = useNotification();

  useEffect(() => {
    (async function getTaskInfo() {
      setLoading(true);
      const token = Cookies.get(ECookiesTypes.accessToken);
      if (!token) {
        return;
      }
      try {
        const taskInfo = await getTask(token, id);
        if (!isResponseError(taskInfo)) {
          setTaskData(taskInfo);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const unresolvedFormSubmitHandler = async (
    data: IInitialTaskSummaryUnresolvedFormValues,
  ) => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      const status = await hasToRescheduleUnresolved(token, id, {
        version: taskData?.version ?? 0,
        assignTo: `${data.user}`,
        note: data.note,
        rescheduleToTime: `${format(new Date(data.date), 'yyyy-MM-dd')}T${format(
          new Date(data.time),
          'HH:mm:ss',
        )}Z`,
      });

      if (status) {
        history.push(ERouteLinks.dashboard);
        openNotification({
          type: ENotificationTypes.success,
          text: 'Task has been successfully unresolved',
        });
      }

      // TODO - Error message ?
    }
  };
  const resolvedFormSubmitHandler = async (data: IInitialTaskSummaryResolvedFormValues) => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      const status = await hasToResolveTask(token, id, {
        version: taskData?.version ?? 0,
        note: data.note,
      });

      if (status) {
        history.push(ERouteLinks.dashboard);
        openNotification({
          type: ENotificationTypes.success,
          text: 'Task has been successfully resolved',
        });
      }

      // TODO - Error message ?
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (taskData?.status === ETaskStatuses.RESOLVED) {
    return (
      <TaskDetailsHeader>
        <Title
          tagName={TitleTags.h3}
          fontSize={FontSizeTypes.l}
          fontFamily={EFontFamilies.bree}
          color={colors.white}
        >
          Resolved by {taskData.resolvedBy?.firstName} {taskData.resolvedBy?.lastName} on{' '}
          {format(new Date(taskData.resolvedTime as string), 'dd.MM.yyyy')} at{' '}
          {format(new Date(taskData.resolvedTime as string), 'h:mm aa')}
        </Title>
      </TaskDetailsHeader>
    );
  }

  return (
    <>
      <Row
        componentWidth="100%"
        ptop="73px"
        pbottom="73px"
        gap="100px"
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
        wrap={true}
      >
        <CircleButton
          bg={colors.turquoise}
          active={resolveStatus}
          onClick={() => setResolveStatus(true)}
        >
          <CircleButtonIcon type={EIconTypes.check} fontSize="55px" color={colors.white} />
          <CircleButtonLabel>resolved</CircleButtonLabel>
        </CircleButton>
        <CircleButton
          bg={colors.error}
          active={!resolveStatus}
          onClick={() => setResolveStatus(false)}
        >
          <CircleButtonIcon type={EIconTypes.times} fontSize="55px" color={colors.white} />
          <CircleButtonLabel>unresolved</CircleButtonLabel>
        </CircleButton>
      </Row>
      <Row
        componentWidth="100%"
        mtop="50px"
        jc={JustifyContentTypes.center}
        ai={AlignItemsTypes.center}
      >
        {!resolveStatus && <UnresolvedForm onSubmit={unresolvedFormSubmitHandler} />}
        {resolveStatus && <ResolvedForm onSubmit={resolvedFormSubmitHandler} />}
      </Row>
    </>
  );
};

export { TaskSummary };
