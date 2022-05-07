import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Form } from 'widgets/Form';
import { FormikProps } from 'formik';
import { EFieldTypes, EInputTypes, IInitialAddEditWebsiteUserFormValues } from 'models/forms';
import { Field } from 'widgets/Form/Field';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { useModal } from 'widgets/Modal/context';
import { Loader } from 'ui/Loader';
import { Row } from 'ui/Layout';
import { TitleTags } from 'ui/Title';
import { IWebsiteUserDetails } from 'models/webiste-user';
import {
  addNewWebsiteUser,
  editWebsiteUser,
  getWebsiteUserDetails,
} from 'requests/website-user';
import { isEmail, isRequired } from 'widgets/Form/validations';
import { initialFormValues } from 'helpers/forms';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { AddTaskTitle, CustomerModalBox, FieldsWrapper } from './styles';
import {
  ECustomerModalTypes,
  getCountyOptions,
  getPostCodeOptions,
  getTownOptions,
} from './helpers';

interface IEditCustomerModal {
  type: ECustomerModalTypes;
  data?: IWebsiteUserDetails;
  onWebsiteUserDataUpdated: (data: IWebsiteUserDetails) => void;
}

export interface IOption {
  label: string;
  value: number;
}

const getInitialValues = (type: ECustomerModalTypes, data?: IWebsiteUserDetails) => {
  if (data && type === ECustomerModalTypes.edit) {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      mobilePhone: data.mobilePhone,
      town: [{ value: data.town.id, label: data.town.name }],
      postalCode: [{ value: data.postCode.id, label: data.postCode.postcode }],
      county: [{ value: data.county.id, label: data.county.name }],
      address: data.address1,
    };
  }

  return { ...initialFormValues.addEditWebsiteUser };
};

const AddEditWebsiteUserModal: FC<IEditCustomerModal> = ({
  type,
  data,
  onWebsiteUserDataUpdated,
}) => {
  const formRef = useRef<HTMLFormElement>();
  const { closeModal } = useModal();
  const { openNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (values: IInitialAddEditWebsiteUserFormValues) => {
    switch (type) {
      case ECustomerModalTypes.add:
        return addNewWebsiteUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobilePhone: String(values.mobilePhone),
          townId: values.town as number,
          postalCodeId: values.postalCode as number,
          countyId: values.county as number,
          address: values.address,
        });
      default:
        return editWebsiteUser((data as IWebsiteUserDetails).id, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobilePhone: String(values.mobilePhone),
          townId: Array.isArray(values.town) ? values.town[0].value : values.town,
          postalCodeId: Array.isArray(values.postalCode)
            ? values.postalCode[0].value
            : values.postalCode,
          countyId: Array.isArray(values.county) ? values.county[0].value : values.county,
          address: values.address,
        });
    }
  };

  const handleSubmit = async (values: IInitialAddEditWebsiteUserFormValues) => {
    setIsLoading(true);
    try {
      const saveResponse = await handleRequest(values);
      const websiteUserResponse = await getWebsiteUserDetails(saveResponse.data.id);
      onWebsiteUserDataUpdated(websiteUserResponse.data);
      setIsLoading(false);
      openNotification({
        type: ENotificationTypes.success,
        text: 'The customer has been successfully added',
        duration: 4000,
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    } finally {
      closeModal();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CustomerModalBox componentWidth="545px" padding="85px 5% 45px">
      <AddTaskTitle
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.l}
      >
        {type === ECustomerModalTypes.add ? 'Add customer' : 'Edit customer'}
      </AddTaskTitle>
      <Form
        initialValues={getInitialValues(type, data)}
        formRef={formRef}
        onSubmit={handleSubmit}
        validations={{
          firstName: [isRequired()],
          lastName: [isRequired()],
          email: [isRequired(), isEmail()],
        }}
        mbottom="24px"
      >
        {(
          formikProps: FormikProps<Partial<IInitialAddEditWebsiteUserFormValues>>,
        ): ReactElement => (
          <>
            <FieldsWrapper>
              <Row mbottom="30px">
                <Field
                  name="firstName"
                  type={EInputTypes.text}
                  label="First name *"
                  placeholder="John"
                  onChange={formikProps.handleChange}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="lastName"
                  type={EInputTypes.text}
                  label="Last Name *"
                  placeholder="Smith"
                  onChange={formikProps.handleChange}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="email"
                  type={EInputTypes.email}
                  label="Email *"
                  onChange={formikProps.handleChange}
                  placeholder="johnsmith@gmail.com"
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="address"
                  label="Address"
                  type={EInputTypes.text}
                  onChange={formikProps.handleChange}
                  placeholder="Address"
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="postalCode"
                  label="Postcode"
                  value={formikProps.values.postalCode}
                  type={EFieldTypes.autocomplete}
                  placeholder="Post code"
                  selectProps={{ loadSuggestions: getPostCodeOptions }}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="town"
                  label="Town"
                  type={EFieldTypes.autocomplete}
                  value={formikProps.values.town}
                  placeholder="Town"
                  selectProps={{ loadSuggestions: getTownOptions }}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="county"
                  label="County"
                  value={formikProps.values.county}
                  type={EFieldTypes.autocomplete}
                  placeholder="County"
                  selectProps={{ loadSuggestions: getCountyOptions }}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="mobilePhone"
                  label="Phone"
                  type={EInputTypes.text}
                  placeholder="Mobile phone"
                  onChange={formikProps.handleChange}
                />
              </Row>
            </FieldsWrapper>
            <Row jc={JustifyContentTypes.flexEnd}>
              <Row componentWidth="204px">
                <Button
                  type={EButtonTypes.submit}
                  onClick={formikProps.handleSubmit}
                  componentSize={ComponentSizesTypes.full}
                  height="50px"
                >
                  {type === ECustomerModalTypes.add ? 'Add' : 'Save'}
                </Button>
              </Row>
            </Row>
          </>
        )}
      </Form>
    </CustomerModalBox>
  );
};

export { AddEditWebsiteUserModal };
