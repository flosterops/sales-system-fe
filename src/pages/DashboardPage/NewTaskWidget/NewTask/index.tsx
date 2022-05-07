import React, { ReactElement, useState, useRef } from 'react';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { Button } from 'ui/Button';
import { assignTask, searchAndReserveTaskAssignment } from 'requests/task';
import { ECookiesTypes } from 'models/cookies';
import Cookies from 'js-cookie';
import { isResponseError } from 'models/guards';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { ITaskAssignRequest } from 'models/task';
import { TStore } from 'store';
import { useSelector } from 'react-redux';
import { CommonLoader } from 'widgets/LoaderComponent/loader';
import { delay } from 'helpers/delay';
import { IAuthResponse } from 'models/user';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { useHistory } from 'react-router-dom';
import { ERouteLinks } from 'models/route';
import { ButtonText, IconWrapper } from '../styles';

const NewTask = (): ReactElement => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const searchingRef = useRef(false);
  const { openModal, closeModal } = useModal();
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));

  const getTask = async (token: string) => {
    let request = null;
    const data = await searchAndReserveTaskAssignment(token);
    if (data !== null) {
      if (!isResponseError(data) && user) {
        request = {
          id: data,
          userId: (user as IAuthResponse).id,
        } as ITaskAssignRequest;
      }
    }
    return request;
  };

  const reservedTask = async () => {
    setLoading(true);

    const token = Cookies.get(ECookiesTypes.accessToken) ?? '';
    const request = await getTask(token);

    if (request !== null) {
      searchingRef.current = false;
      setLoading(false);
      openModal(EModalTypes.NewTaskComponent, {
        confirmButtonAction: async () => {
          const result = await assignTask(token, request);
          if (!isResponseError(result)) {
            closeModal();
            if (request.id) {
              history.push(ERouteLinks.task.replace(':id', request.id));
            }
          }
        },
      });
    } else {
      await delay(5000);
      if (searchingRef.current) {
        await reservedTask();
      }
    }
  };

  return (
    <>
      <Row jc={JustifyContentTypes.center} ai={AlignItemsTypes.center}>
        <CommonLoader
          title="Searching for a new task…"
          show={loading}
          close={() => {
            setLoading(false);
            searchingRef.current = false;
          }}
        />
        <Button
          type={EButtonTypes.button}
          variant={EButtonsVariants.transparent}
          borderRadius="0px"
          height="100%"
          mleft="auto"
          mtop="-4px"
          onClick={async () => {
            searchingRef.current = true;
            await reservedTask();
          }}
          jc={JustifyContentTypes.flexEnd}
        >
          <ButtonText>Go To Task</ButtonText>
          <IconWrapper
            componentWidth="72px"
            componentHeight="72px"
            jc={JustifyContentTypes.center}
            ai={AlignItemsTypes.center}
            bg={colors.primary}
          >
            <Icon
              mleft="5px"
              type={EIconTypes.rightChevron}
              color={colors.white}
              fontSize="35px"
            />
          </IconWrapper>
        </Button>
      </Row>
    </>
  );
};

export { NewTask };
