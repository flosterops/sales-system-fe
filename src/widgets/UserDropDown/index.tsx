import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { ERouteLinks } from 'models/route';
import { Column, Row } from 'ui/Layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import {
  AlignItemsTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import useOnClickOutside from 'helpers/use-on-click-outside';
import { NavLink } from 'ui/NavLink';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { EBreakWindowTypes } from 'models/break-window';
import { DropDownMarker, PopupWrapper, UserDropDownWrapper } from './styles';
import config from './config.json';

interface IDropDownLinkConfig {
  id: string;
  path: ERouteLinks;
  icon: EIconTypes;
  text: string;
}

interface IUserDropDown {
  name: string;
}

const UserDropDown = ({ name }: IUserDropDown): ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { openModal } = useModal();

  const setVisibleCallback = useCallback((): void => setVisible(false), [setVisible]);

  useOnClickOutside(containerRef, setVisibleCallback);

  const onBreakStart = () =>
    openModal(EModalTypes.LogOutModal, { type: EBreakWindowTypes.default });

  return (
    <UserDropDownWrapper
      padding="0 17px 0 24px"
      jc={JustifyContentTypes.center}
      ai={AlignItemsTypes.spaceBetween}
      componentWidth="auto"
      bg={colors.white}
      layoutRef={containerRef}
    >
      <Row
        jc={JustifyContentTypes.spaceBetween}
        ai={AlignItemsTypes.center}
        padding="10px 0 14px 0"
        onClick={(): void => setVisible(!visible)}
      >
        <Icon
          type={EIconTypes.account}
          fontSize="24px"
          color={colors.turquoise}
          mright="10px"
        />
        <Description weight={WeightTypes.w600} color={colors.turquoise}>
          Hello, {name}!
        </Description>
        <DropDownMarker
          type={EIconTypes.downChevron}
          color={colors.turquoise}
          visible={visible}
        />
      </Row>
      <PopupWrapper visible={visible} height={ref.current?.clientHeight as number}>
        <Column padding="13px 0" layoutRef={ref}>
          {(config as IDropDownLinkConfig[]).map(
            (item: IDropDownLinkConfig): ReactElement => (
              <NavLink key={item.id} to={item.path}>
                <Row ai={AlignItemsTypes.center} mbottom="20px">
                  <Row componentWidth="21px" mright="18px" jc={JustifyContentTypes.center}>
                    <Icon type={item.icon} color={colors.turquoise} />
                  </Row>
                  <Description fontSize={FontSizeTypes.m}>{item.text}</Description>
                </Row>
              </NavLink>
            ),
          )}
          <NavLink
            key="d17c9182-6ca2-11ec-90d6-0242ac120003"
            to={ERouteLinks.logOut}
            onClick={() => onBreakStart()}
          >
            <Row ai={AlignItemsTypes.center} margin="10px 0">
              <Row componentWidth="21px" mright="18px" jc={JustifyContentTypes.center}>
                <Icon type={EIconTypes.signOut} color={colors.turquoise} />
              </Row>
              <Description fontSize={FontSizeTypes.m}>Log out</Description>
            </Row>
          </NavLink>
        </Column>
      </PopupWrapper>
    </UserDropDownWrapper>
  );
};

export { UserDropDown };
