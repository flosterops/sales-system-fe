import React, { ReactElement, useState } from 'react';
import { Form } from 'widgets/Form';
import { FormikHelpers } from 'formik';
import { Field } from 'widgets/Form/Field';
import { Row } from 'ui/Layout';
import { initialNotesFormValues } from 'helpers/forms';
import { isRequired, notAllowFilesBySize } from 'widgets/Form/validations';
import { ENoteType } from 'models/notes';
import { EFieldTypes, EInputTypes, IInitialNotesFormValues } from 'models/forms';
import { Icon } from 'ui/Icon';
import { EButtonTypes } from 'models/button';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { addNote } from 'requests/notes';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { Button } from 'ui/Button';
import { StyledAdornment } from 'pages/TaskPage/Notes/NotesForm/styles';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { saveFile } from 'requests/media';
import { Loader } from 'ui/Loader';
import { IWebsiteUserDetails } from 'models/webiste-user';

interface ISelectOption {
  label: string;
  value: ENoteType;
}

const selectOptions: ISelectOption[] = [
  { label: 'GLOBAL', value: ENoteType.global },
  { label: 'SALES', value: ENoteType.sales },
];

interface INotesForm {
  updateNotesList: () => void;
  websiteUser: IWebsiteUserDetails | null;
}

const NotesForm = ({ updateNotesList, websiteUser }: INotesForm) => {
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (
    data: IInitialNotesFormValues,
    { resetForm }: FormikHelpers<IInitialNotesFormValues>,
  ) => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    try {
      if (token && websiteUser) {
        setIsLoading(true);
        const businessNoteAttachments = await Promise.all(
          data.businessNoteAttachments.map((file) => saveFile(token, file)),
        );

        const isNodeAdded = await addNote(token, {
          content: data.note,
          noteType: data.type,
          websiteUserId: websiteUser.id,
          businessNoteAttachments: businessNoteAttachments.map(
            (attachment) => attachment.data.id,
          ),
        });

        if (isNodeAdded) {
          updateNotesList();
          resetForm({
            values: initialNotesFormValues,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      initialValues={initialNotesFormValues}
      onSubmit={submitHandler}
      validations={{
        note: [isRequired()],
        type: [isRequired()],
        businessNoteAttachments: [notAllowFilesBySize(20)],
      }}
    >
      {(): ReactElement => (
        <Row gap="20px" wrap>
          <Row componentWidth="35%">
            <Field
              name="type"
              type={EFieldTypes.select}
              placeholder="-- Choose note type --"
              label="Note type"
              options={selectOptions}
              icon={EIconTypes.stickyNote}
            />
          </Row>
          <Row componentWidth="100%">
            <Field
              name="note"
              type={EFieldTypes.textarea}
              placeholder="Add note"
              height="100px"
              endAdornment={
                <StyledAdornment>
                  <Field
                    multiple
                    hasError={false}
                    name="businessNoteAttachments"
                    type={EInputTypes.files}
                    jc={JustifyContentTypes.center}
                    ai={AlignItemsTypes.center}
                    accept=".JPG,.PNG,.PDF,.DOC,.DOCX,.XLS,.XLSX"
                  />
                  <Button
                    height="100px"
                    width="100%"
                    borderRadius="0 22px 22px 0"
                    type={EButtonTypes.submit}
                  >
                    <Icon type={EIconTypes.paperPlane} color={colors.white} fontSize="40px" />
                  </Button>
                </StyledAdornment>
              }
            />
          </Row>
          <Field name="businessNoteAttachments" type={EFieldTypes.filesViews} />
        </Row>
      )}
    </Form>
  );
};
export { NotesForm };
