import React, { ReactElement } from 'react';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import {
  AlignItemsTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Description } from 'ui/Description';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';
import { UserInfoContainer } from './styles';
import { AddOrderButton } from '../../../widgets/AddOrderButton';

interface IUserInfo {
  user: IWebsiteUserDetails | null;
}

const UserInfo = ({ user }: IUserInfo): ReactElement | null => {
  if (!user) {
    return null;
  }

  return (
    <UserInfoContainer padding="30px 30px 39px">
      <Row ai={AlignItemsTypes.flexEnd} mbottom="13px">
        <Description color={colors.textDisabled} fontSize={FontSizeTypes.xm}>
          Customer ID:{' '}
        </Description>
        <Description
          fontFamily={EFontFamilies.bree}
          color={colors.black}
          fontSize={FontSizeTypes.l}
          lh="1"
          mleft="5px"
        >
          {user.id}
        </Description>
        <Icon mleft="7px" fontSize="18px" type={EIconTypes.pencilAlt} color={colors.primary} />
      </Row>
      <Row ai={AlignItemsTypes.center} mbottom="13px">
        <Row componentWidth="16px">
          <Icon color={colors.textDisabled} type={EIconTypes.account} fontSize="16px" />
        </Row>
        <NavLink to={'/#' as ERouteLinks} fontSize={FontSizeTypes.s} mleft="5px">
          {user.firstname} {user.lastname}
        </NavLink>
        <Icon mleft="7px" fontSize="18px" type={EIconTypes.pencilAlt} color={colors.primary} />
      </Row>
      <Row ai={AlignItemsTypes.center} mbottom="13px">
        <Row componentWidth="16px">
          <Icon color={colors.textDisabled} type={EIconTypes.mapMarkerAlt} fontSize="16px" />
        </Row>
        <Description color={colors.black} mleft="5px">
          {user.postCode.postcode} {user.address1} {user.address2} {user.addressInput}
        </Description>
      </Row>
      <Row ai={AlignItemsTypes.center} mbottom="13px">
        <Row componentWidth="16px">
          <Icon color={colors.textDisabled} type={EIconTypes.phoneAlt} fontSize="16px" />
        </Row>
        <Description color={colors.black} mleft="5px">
          {user.phone || user.mobilePhone}
        </Description>
      </Row>
      <Row ai={AlignItemsTypes.center}>
        <Row componentWidth="16px">
          <Icon color={colors.textDisabled} type={EIconTypes.email} fontSize="16px" />
        </Row>
        <Description mleft="5px" color={colors.black}>
          {' '}
          {user.email}
        </Description>
      </Row>
      <Row jc={JustifyContentTypes.center} mtop="30px">
        <Button>
          <Description
            color={colors.white}
            fontSize={FontSizeTypes.xm}
            weight={WeightTypes.w800}
          >
            Add task
          </Description>
        </Button>
      </Row>
      <Row jc={JustifyContentTypes.center} mtop="30px">
        {user && <AddOrderButton userId={user.id} />}
      </Row>
    </UserInfoContainer>
  );
};

export { UserInfo };
