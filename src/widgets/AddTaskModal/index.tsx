import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FormikHelpers, FormikProps, FormikValues } from 'formik';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import { EFontFamilies, FontSizeTypes, JustifyContentTypes, WeightTypes } from 'models/layout';
import { Description } from 'ui/Description';
import { Form } from 'widgets/Form';
import { Field } from 'widgets/Form/Field';
import { EButtonTypes } from 'models/button';
import { EFieldTypes, IInitialAddTaskFormValues } from 'models/forms';
import { TitleTags } from 'ui/Title';
import { colors } from 'styles/colors';
import { assignTask, createTask } from 'requests/task';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { formatISO } from 'date-fns';
import { isRequired } from 'widgets/Form/validations';
import { Loader } from 'ui/Loader';
import { useModal } from 'widgets/Modal/context';
import { ITasksResponse } from 'models/task';
import { useNotification } from 'widgets/Notification/context';
import { ENotificationTypes } from 'models/notification';
import { AddModalContainer, AddTaskTitle, FieldsWrapper } from './styles';
import { TaskTypesArray } from './constants';
import { getAssignUserList, getVrmList, getWebSiteUserAsOption } from './helpers';
import { getClientOrdersList } from './OrderField/helpers';
import { AddTaskInitializedFields } from './AddTaskFields';

export const isRequiredByOtherFields =
  (errorText: string, fields: string[]) => (formValues: FormikValues) => {
    const hasValid = fields.some(
      (field: string) => !isRequired()({ value: formValues.values[field] }),
    );
    return hasValid ? '' : errorText;
  };

const mandatoryFields = ['clientId', 'order', 'vrm'];

interface IOption {
  label: string | number;
  value: string | number;
}

const AddTaskModal: FC<Partial<IInitialAddTaskFormValues>> = ({
  clientId,
  order,
  vrm,
}): ReactElement => {
  const formRef = useRef<HTMLFormElement>();
  const { closeModal } = useModal();
  const { openNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [clientIdDefaultOption, setClientIdDefaultOption] = useState<IOption[]>([]);
  const [orderDefaultOption, setOrderDefaultOption] = useState<IOption[]>([]);
  const [vrmDefaultOption, setVrmDefaultOption] = useState<IOption[]>([]);

  useEffect(() => {
    (async function loadDefaults() {
      setIsLoading(true);
      try {
        const [clientIdResponse, orderResponse, vrmResponse] = await Promise.all([
          clientId ? getWebSiteUserAsOption(clientId as string) : [],
          order ? getClientOrdersList(clientId as string) : [],
          vrm ? getVrmList(vrm as string) : [],
        ]);
        setClientIdDefaultOption(clientIdResponse);
        setOrderDefaultOption(orderResponse);
        setVrmDefaultOption(vrmResponse);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = async (
    values: IInitialAddTaskFormValues,
    helpers: FormikHelpers<IInitialAddTaskFormValues>,
  ) => {
    const token = Cookies.get(ECookiesTypes.accessToken);
    setIsLoading(true);
    try {
      const response = await createTask(token as string, {
        orderId: values.order,
        taskType: values.taskType,
        scheduleToTime: values.executionDate
          ? formatISO(new Date(values.executionDate))
          : null,
      });

      const taskResponse = response as unknown as ITasksResponse;

      if (values.assign) {
        await assignTask(token as string, {
          id: taskResponse.data.id,
          userId: values.assign,
        });
      }

      openNotification({
        type: ENotificationTypes.success,
        text: 'Task successfully added',
      });

      closeModal();
    } catch (e: any) {
      openNotification({
        type: ENotificationTypes.failed,
        text: 'Failed to add task',
      });

      if (
        e.response &&
        e.response.data.status === 'fail' &&
        e.response.data.data.scheduleToTime
      ) {
        helpers.setErrors({ executionDate: e.response.data.data.scheduleToTime });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AddModalContainer componentWidth="548px" padding="85px 55px 45px 55px">
      {isLoading && <Loader />}
      <AddTaskTitle
        tagName={TitleTags.h2}
        fontFamily={EFontFamilies.bree}
        fontSize={FontSizeTypes.l}
      >
        Add task
      </AddTaskTitle>
      <Form
        initialValues={{}}
        onSubmit={addTask}
        formRef={formRef}
        validations={{
          clientId: [isRequiredByOtherFields('Please select the client Id', mandatoryFields)],
          order: [isRequiredByOtherFields('Please select the order', mandatoryFields)],
          vrm: [isRequiredByOtherFields('Please select the vrm', mandatoryFields)],
          taskType: [isRequired('Please choose a task')],
        }}
        reinitialize
      >
        {(formikProps: FormikProps<IInitialAddTaskFormValues>): ReactElement => (
          <>
            <FieldsWrapper>
              <AddTaskInitializedFields
                vrmDefaultOption={vrmDefaultOption}
                orderDefaultOption={orderDefaultOption}
                clientIdDefaultOption={clientIdDefaultOption}
                clientId={clientId}
              />
              <Row mbottom="30px">
                <Field
                  name="taskType"
                  type={EFieldTypes.select}
                  label="Task *"
                  placeholder="Select type of task"
                  options={TaskTypesArray}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  name="assign"
                  type={EFieldTypes.autocomplete}
                  label="Assign *"
                  placeholder="Select user to assign"
                  selectProps={{ loadSuggestions: getAssignUserList }}
                />
              </Row>
              <Row mbottom="30px">
                <Field
                  datePickerProps={{
                    dateFormat: 'dd/MM/yyyy h:mm aa',
                    showTimeSelect: true,
                  }}
                  name="executionDate"
                  type={EFieldTypes.datetime}
                  label="Execution date"
                  placeholder="Select execution date"
                  hasError
                />
              </Row>
            </FieldsWrapper>
            <Row mbottom="30px">
              <Field
                name="note"
                type={EFieldTypes.textarea}
                height="147px"
                placeholder="Write a note"
              />
            </Row>
            <Row jc={JustifyContentTypes.flexEnd}>
              <Button type={EButtonTypes.submit} onClick={formikProps.handleSubmit}>
                <Description
                  fontSize={FontSizeTypes.l}
                  color={colors.white}
                  weight={WeightTypes.w800}
                >
                  Add
                </Description>
              </Button>
            </Row>
          </>
        )}
      </Form>
    </AddModalContainer>
  );
};

export { AddTaskModal };
