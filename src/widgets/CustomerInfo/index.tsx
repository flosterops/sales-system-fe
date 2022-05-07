import React, { FC } from 'react';
import { AlignItemsTypes, EFontFamilies } from 'models/layout';
import { Row } from 'ui/Layout';
import { TitleTags } from 'ui/Title';
import { EIconTypes } from 'models/icons';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { colors } from 'styles/colors';
import { ECustomerModalTypes } from 'widgets/CustomerModal/helpers';
import {
  CustomerEditIcon,
  CustomerInfoWrapper,
  StyledCustomerID,
  StyledCustomerIDValue,
} from './styles';
import { CustomerInfoField } from './CustomerInfoField';

interface ICustomerInfo {
  customerData?: IWebsiteUserDetails;
  handleDataUpdated: (customerData: IWebsiteUserDetails) => void;
}

const CustomerInfo: FC<ICustomerInfo> = ({ customerData, handleDataUpdated }) => {
  const { openModal } = useModal();

  if (!customerData) {
    return null;
  }

  const onWebsiteUserDataUpdated = (newCustomerData: IWebsiteUserDetails) => {
    handleDataUpdated(newCustomerData);
  };

  const { id, firstname, lastname, address1, postCode, town, county, mobilePhone, email } =
    customerData;

  return (
    <CustomerInfoWrapper>
      <Row ai={AlignItemsTypes.flexEnd} mbottom="13px">
        <StyledCustomerID tagName={TitleTags.h3} fontFamily={EFontFamilies.bree}>
          Customer ID:
        </StyledCustomerID>
        <StyledCustomerIDValue tagName={TitleTags.h3} fontFamily={EFontFamilies.bree}>
          {id}
        </StyledCustomerIDValue>
      </Row>
      <Row mbottom="14px">
        <CustomerInfoField
          icon={EIconTypes.account}
          value={`${firstname} ${lastname}`}
          highlighted
        >
          <CustomerEditIcon
            type={EIconTypes.pencilAlt}
            fontSize="18px"
            color={colors.primary}
            onClick={() =>
              openModal(EModalTypes.AddEditWebsiteUserModal, {
                withCloseButton: true,
                type: ECustomerModalTypes.edit,
                data: customerData,
                onWebsiteUserDataUpdated,
              })
            }
          />
        </CustomerInfoField>
      </Row>
      <Row mbottom="14px">
        <CustomerInfoField
          icon={EIconTypes.mapMarkerAlt}
          value={`${address1}, ${postCode?.postcode}, ${town?.name}, ${county?.name}`}
        />
      </Row>
      <Row mbottom="14px">
        <CustomerInfoField icon={EIconTypes.phoneAlt} value={mobilePhone} />
      </Row>
      <Row>
        <CustomerInfoField icon={EIconTypes.email} value={email} />
      </Row>
    </CustomerInfoWrapper>
  );
};

export { CustomerInfo };
