import React, { ReactElement } from 'react';
import { Box } from 'ui/Box';
import { Column, Row } from 'ui/Layout';
import { Title, TitleTags } from 'ui/Title';
import {
  AlignItemsTypes,
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { useModal } from 'widgets/Modal/context';
import { EIconTypes } from 'models/icons';
import { Description } from 'ui/Description';
import { Form } from 'widgets/Form';
import { FormikProps, FormikValues } from 'formik';
import { Field } from 'widgets/Form/Field';
import { EFieldTypes, IInitialAssigneeFormValues } from 'models/forms';
import { Button } from 'ui/Button';
import { EButtonsVariants } from 'models/button';
import { colors } from 'styles/colors';
import Cookies from 'js-cookie';
import { assignTask } from 'requests/task';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';
import { initialFormValues } from 'helpers/forms';
import { getAssignUserList } from 'widgets/AddTaskModal/helpers';
import { CancelButton } from './styles';
import { useFetchUsers } from './hooks';

const AssignTaskModal = (): ReactElement => {
  const { closeModal, options } = useModal();
  const { users } = useFetchUsers();

  const handleSubmit = async (values: FormikValues): Promise<void> => {
    const token = Cookies.get(ECookiesTypes.accessToken) || '';
    const data = await assignTask(token, {
      id: options.taskId.replace('task-queue-', ''),
      userId: values.assign,
    });
    if (!isResponseError(data)) {
      options.callback();
      closeModal();
    }
  };

  return (
    <Box padding="57px 55px 56px" componentWidth="548px">
      <Column componentHeight="120px" ai={AlignItemsTypes.center}>
        <Title
          fontFamily={EFontFamilies.bree}
          weight={WeightTypes.w600}
          fontSize={FontSizeTypes.l}
          tagName={TitleTags.h3}
          mbottom="20px"
        >
          Assign selected task
        </Title>
        <Description
          fontSize={FontSizeTypes.xm}
          textAlign={AlignTextTypes.center}
          mbottom="20px"
        >
          {options.taskName}
        </Description>
      </Column>
      <Form initialValues={initialFormValues.assign} onSubmit={handleSubmit}>
        {(formikProps: FormikProps<IInitialAssigneeFormValues>): ReactElement => (
          <>
            <Column>
              <Field
                name="assign"
                type={EFieldTypes.autocomplete}
                icon={EIconTypes.search}
                label="Assign to"
                placeholder="Type name"
                selectProps={{
                  loadSuggestions: getAssignUserList,
                  isSearchable: true,
                  defaultOptions: users,
                }}
              />
            </Column>
            <Row jc={JustifyContentTypes.spaceBetween} ai={AlignItemsTypes.center} mtop="35px">
              <CancelButton onClick={closeModal} variant={EButtonsVariants.info}>
                <Description
                  fontSize={FontSizeTypes.m}
                  weight={WeightTypes.w400}
                  color={colors.white}
                >
                  Cancel
                </Description>
              </CancelButton>
              <Button
                mleft="30px"
                onClick={formikProps.handleSubmit}
                variant={EButtonsVariants.primary}
              >
                <Description
                  fontSize={FontSizeTypes.m}
                  weight={WeightTypes.w400}
                  color={colors.white}
                >
                  OK
                </Description>
              </Button>
            </Row>
          </>
        )}
      </Form>
    </Box>
  );
};

export { AssignTaskModal };
