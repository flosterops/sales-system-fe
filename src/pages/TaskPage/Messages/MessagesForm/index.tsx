import React, { ReactElement, useState } from 'react';
import { Form } from 'widgets/Form';
import {
  EFieldTypes,
  EInputTypes,
  IFileAttachments,
  IInitialEmailFormValues,
  IInitialEmailMessageFormValues,
} from 'models/forms';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';
import { FormikHelpers, FormikProps, FormikState } from 'formik';
import { EButtonTypes } from 'models/button';
import { ComponentSizesTypes, JustifyContentTypes } from 'models/layout';
import { EEmailMessageType, ISendEmailRequest, ISendTextMessage } from 'models/email-message';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { colors } from 'styles/colors';
import { sendEmailMessage, sendTextMessage } from 'requests/email-message';
import { useSelector } from 'react-redux';
import { TStore } from 'store';
import {
  isRequired,
  lessThan,
  notAllowFilesByType,
  notAllowFilesCompareBySize,
} from 'widgets/Form/validations';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { Loader } from 'ui/Loader';
import { saveFile } from 'requests/media';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { MediaSaveResponse } from 'models/media';
import { filesType, IFormData, selectOptions } from './helper';
import { ErrorLabel, StyledField, StyledFieldAttachments } from './styles';

interface IMessageForm {
  websiteUser: IWebsiteUserDetails;
  refreshListMessages: () => void;
}

const MessagesForm = ({ websiteUser, refreshListMessages }: IMessageForm) => {
  const [isLoading, setIsLoading] = useState(false);
  const defaultTypeMessage = selectOptions[0];
  const [typeMessage, setTypeMessage] = useState<EEmailMessageType>(defaultTypeMessage.value);
  const { user } = useSelector((state: TStore) => ({ user: state.user.user }));

  const initValues: IInitialEmailMessageFormValues = {
    type: defaultTypeMessage,
    title: '',
    message: '',
    attachments: [],
  };

  const changeType = (
    value: EEmailMessageType,
    resetForm: {
      (nextState?: Partial<FormikState<IInitialEmailFormValues>> | undefined): void;
      (): void;
    },
  ) => {
    setTypeMessage(value);
    resetForm();
  };

  const submitFormHandler = async (
    data: IFormData,
    { resetForm }: FormikHelpers<IInitialEmailMessageFormValues>,
  ) => {
    setIsLoading(true);

    if (typeMessage === EEmailMessageType.email) {
      const token = Cookies.get(ECookiesTypes.accessToken);
      let attachments: MediaSaveResponse[] = [];
      if (token) {
        attachments = await Promise.all(
          data.attachments?.map((file) => saveFile(token, file)),
        );
      }

      const requestData = {
        recipientTo: user?.email,
        sender: process.env.REACT_APP_EMAIL_SUPPORT,
        subject: data.title,
        body: data.message,
        websiteUserId: websiteUser.id,
        emailMessageAttachments: attachments.map((attachment) => attachment.data.id),
      } as ISendEmailRequest;

      await sendEmailMessage(requestData);
      resetForm({ values: initValues });
      refreshListMessages();
    } else if (typeMessage === EEmailMessageType.message && data.message) {
      const requestData = {
        phoneNumber: websiteUser.phone,
        body: data.message,
        websiteUserId: websiteUser.id,
      } as ISendTextMessage;

      await sendTextMessage(requestData);
      resetForm({ values: initValues });
      refreshListMessages();
    }
    setIsLoading(false);
  };

  const deleteAttachment = (
    attachment: IFileAttachments,
    values: IFileAttachments[] | [],
    setValues: (field: string, value: any) => void,
  ) => {
    const result = values.filter((att) => att !== attachment);
    setValues('attachments', result);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      initialValues={initValues}
      onSubmit={submitFormHandler}
      validations={{
        type: [isRequired()],
        title: [lessThan(255)],
        message: [isRequired(), lessThan(50000)],
        attachments: [notAllowFilesCompareBySize(8), notAllowFilesByType(filesType)],
      }}
    >
      {(formikProps: FormikProps<IInitialEmailFormValues>): ReactElement => (
        <>
          <Row componentWidth="438px">
            <StyledField
              name="type"
              label="Type"
              type={EFieldTypes.select}
              options={selectOptions}
              placeholder="Type"
              icon={EIconTypes.email}
              onChange={(e) => changeType(e.target.value, formikProps.resetForm)}
            />
          </Row>
          {typeMessage === EEmailMessageType.email && (
            <StyledField
              name="title"
              label="Title"
              type={EInputTypes.text}
              value=""
              placeholder="Email title"
            />
          )}
          <StyledField
            name="message"
            type={EFieldTypes.textarea}
            value=""
            label="Message"
            placeholder="Message"
            height="83px"
            endAdornment={
              <Row
                jc={JustifyContentTypes.flexEnd}
                componentWidth={typeMessage === EEmailMessageType.email ? '166px' : '83px'}
              >
                {typeMessage === EEmailMessageType.email && (
                  <StyledFieldAttachments
                    name="attachments"
                    type={EFieldTypes.files}
                    value=""
                    placeholder="Attachments"
                    multiple={true}
                  />
                )}
                <Button
                  borderRadius="0px 22px 22px 0px"
                  height="83px"
                  width="83px"
                  type={EButtonTypes.submit}
                  componentSize={ComponentSizesTypes.s}
                  padding="0"
                >
                  <Icon
                    type={EIconTypes.paperPlane}
                    color={colors.white}
                    fontSize="30px"
                    pointer
                  />
                </Button>
              </Row>
            }
          />
          <ErrorLabel> {formikProps.errors.attachments} </ErrorLabel>
          {!!formikProps.values?.attachments?.length &&
            Array.from(formikProps.values.attachments).map((att) => (
              <Row mtop="14px" key={`attachment-${att.lastModified}`}>
                <Icon
                  type={EIconTypes.paperClip}
                  color={colors.turquoise}
                  fontSize="18px"
                  pointer
                  mright="5px"
                />
                {att.name}
                <Icon
                  type={EIconTypes.times}
                  color={colors.lightGray}
                  fontSize="18px"
                  pointer
                  mleft="5px"
                  onClick={() =>
                    deleteAttachment(
                      att,
                      formikProps.values.attachments ?? [],
                      formikProps.setFieldValue,
                    )
                  }
                />
              </Row>
            ))}
        </>
      )}
    </Form>
  );
};

export { MessagesForm };
