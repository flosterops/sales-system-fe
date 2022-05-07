import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useModal } from 'widgets/Modal/context';
import { Column, Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { useDebounce } from 'helpers/useDebounce';
import { initialFormValues } from 'helpers/forms';
import {
  AlignItemsTypes,
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Button } from 'ui/Button';
import { EButtonsVariants } from 'models/button';
import { Form } from 'widgets/Form';
import { EFieldTypes } from 'models/forms';
import { EIconTypes } from 'models/icons';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getWebsiteUserByPhrase, setVehicleInterest } from 'requests/website-user';
import { IWebsiteUser, IWebsiteUserSearchResponse } from 'models/webiste-user';
import { ISpecialSelectOptions } from 'widgets/Form/Select';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { ModalContainer, StyledField } from './style';

const customersRequestData = {
  criteria: {
    phrase: '',
  },
  page: {
    pageNumber: 0,
    pageSize: 10,
  },
};

const AssignCustomer = (): ReactElement => {
  const { openNotification } = useNotification();
  const { closeModal, options } = useModal();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<IWebsiteUser[]>([]);

  const searchValue = useDebounce(search, 500);
  useEffect(() => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token && searchValue.length >= 2) {
      customersRequestData.criteria.phrase = searchValue;
      getWebsiteUserByPhrase(token, customersRequestData).then(
        (response: IWebsiteUserSearchResponse) => {
          setCustomers(response.data.content);
        },
      );
    } else {
      setCustomers([]);
    }
  }, [searchValue]);

  const onChangeSearchFieldHandler = (value: string) => {
    setSearch(value);
  };

  const searchOptions = customers.map((el) => ({
    label: `${el.id} - ${el.firstname} ${el.lastname}`,
    value: el.id,
  }));

  const selectProps: ISpecialSelectOptions = {
    isClearable: true,
    isSearchable: true,
    onInputChange: onChangeSearchFieldHandler,
  };
  const formRef = useRef<HTMLFormElement>();

  const formSubmitHandler = async (data: { search: string }): Promise<void> => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token && data.search) {
      const vehicleInterest = await setVehicleInterest(token, data.search, options.id);
      if (!vehicleInterest) {
        closeModal();
        return openNotification({
          type: ENotificationTypes.success,
          text: "Vehicle assigned to the customer's interests.",
        });
      }
    }
    closeModal();
    return openNotification({
      type: ENotificationTypes.failed,
      text: 'Could not assign the vehicle to the customer&apos;s interests',
    });
  };

  const assignToHandler = async (): Promise<void> => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <ModalContainer>
      <Column>
        <Row
          componentWidth="100%"
          ai={AlignItemsTypes.center}
          jc={JustifyContentTypes.center}
          mtop="57px"
        >
          <Description
            textAlign={AlignTextTypes.center}
            fontSize={FontSizeTypes.l}
            fontFamily={EFontFamilies.bree}
          >
            Assign the vehicle to the customer&apos;s interests
          </Description>
        </Row>
        <Row
          componentWidth="100%"
          ai={AlignItemsTypes.center}
          jc={JustifyContentTypes.center}
          mtop="30px"
        >
          <Form
            initialValues={initialFormValues.search}
            formRef={formRef}
            onSubmit={formSubmitHandler}
          >
            <StyledField
              name="search"
              type={EFieldTypes.select}
              options={searchOptions}
              selectProps={selectProps}
              placeholder="Type customer name or ID"
              icon={EIconTypes.search}
              value={search}
            />
          </Form>
        </Row>
        <Row
          componentWidth="100%"
          ai={AlignItemsTypes.center}
          jc={JustifyContentTypes.center}
          mtop="35px"
        >
          <Button onClick={closeModal} mleft="15px" variant={EButtonsVariants.info}>
            Close
          </Button>
          <Button onClick={assignToHandler} mleft="15px" variant={EButtonsVariants.primary}>
            OK
          </Button>
        </Row>
      </Column>
    </ModalContainer>
  );
};

export { AssignCustomer };
