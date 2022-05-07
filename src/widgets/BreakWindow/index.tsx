import React, { ReactElement, useEffect, useState } from 'react';
import { EBreakWindowTypes } from 'models/break-window';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Title, TitleTags } from 'ui/Title';
import {
  AlignItemsTypes,
  AlignTextTypes,
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Description } from 'ui/Description';
import { Button } from 'ui/Button';
import { Box } from 'ui/Box';
import { Column, Row } from 'ui/Layout';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { useModal } from 'widgets/Modal/context';
import { addSeconds, format } from 'date-fns';
import { confirmActivity, initiateBreak } from 'requests/time-track';
import { isResponseError } from 'models/guards';
import { FormikProps, FormikValues } from 'formik';
import { Form } from 'widgets/Form';
import { Field } from 'widgets/Form/Field';
import { EFieldTypes } from 'models/forms';
import { isRequired } from 'widgets/Form/validations';
import { EModalTypes } from 'models/modal';
import { EBreakStatuses } from 'models/time-track';
import { useBreakReasonOptions } from './hooks';
import { Timer } from './styles';

interface IBreakWindow {
  type: EBreakWindowTypes;
}

const DefaultBreakWindow = (): ReactElement => {
  const { options, loading } = useBreakReasonOptions();
  const { openModal } = useModal();

  const handleSubmit = async (values: FormikValues) => {
    const data = await initiateBreak(values.reason as EBreakStatuses);
    if (isResponseError(data)) {
      return;
    }

    openModal(EModalTypes.BreakWindow, { type: EBreakWindowTypes.timer });
  };

  return (
    <Box
      componentWidth="548px"
      componentHeight="467px"
      ai={AlignItemsTypes.center}
      padding="46px 55px 42px"
    >
      <Icon type={EIconTypes.pauseCircle} color={colors.primary} fontSize="100px" />
      <Title
        mtop="18px"
        tagName={TitleTags.h3}
        fontSize={FontSizeTypes.l}
        fontFamily={EFontFamilies.bree}
      >
        You have a break
      </Title>
      <Description textAlign={AlignTextTypes.center} fontSize={FontSizeTypes.m} mbottom="30px">
        Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non
        felis
      </Description>
      <Form
        initialValues={{ reason: '' }}
        onSubmit={() => {}}
        validations={{ reason: [isRequired('Please select a reason')] }}
      >
        {(formikProps: FormikProps<FormikValues>): ReactElement => (
          <>
            <Field
              name="reason"
              type={EFieldTypes.select}
              value={formikProps.values.reason}
              options={options}
              icon={EIconTypes.coffee}
              placeholder="-- Please select a reason--"
              label="Required *"
              selectProps={{ isLoading: loading }}
            />
            <Row jc={JustifyContentTypes.center}>
              <Button
                disabled={!formikProps.values.reason}
                height="60px"
                type={EButtonTypes.submit}
                mtop="25px"
                color={colors.primary}
                onClick={() => handleSubmit(formikProps.values)}
                variant={
                  formikProps.values.reason
                    ? EButtonsVariants.primary
                    : EButtonsVariants.disabled
                }
              >
                <Description
                  color={colors.white}
                  fontSize={FontSizeTypes.xxm}
                  weight={WeightTypes.w800}
                >
                  Ok
                </Description>
              </Button>
            </Row>
          </>
        )}
      </Form>
    </Box>
  );
};

const TimerBreakWindow = (): ReactElement => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  }, [time, setTime]);

  const { closeModal } = useModal();
  const date = addSeconds(new Date(0), time);
  const truncHours = Math.trunc(time / 3600);

  const onConfirmActivity = async (): Promise<void> => {
    const data = await confirmActivity();
    if (isResponseError(data)) {
      return;
    }

    closeModal();
  };

  return (
    <Column
      componentWidth="100vw"
      ai={AlignItemsTypes.center}
      componentHeight="100vh"
      jc={JustifyContentTypes.center}
    >
      <Icon type={EIconTypes.clock} color={colors.white} fontSize="150px" />
      <Timer color={colors.white} fontFamily={EFontFamilies.bree}>
        {!!truncHours && `${truncHours}:`}
        {format(date, 'mm:ss')}
      </Timer>
      <Row componentWidth="257px">
        <Button
          variant={EButtonsVariants.white}
          onClick={onConfirmActivity}
          componentSize={ComponentSizesTypes.full}
        >
          <Description
            color={colors.primary}
            fontSize={FontSizeTypes.xxm}
            weight={WeightTypes.w800}
          >
            Back to work
          </Description>
        </Button>
      </Row>
    </Column>
  );
};

const BreakWindow = ({ type }: IBreakWindow): ReactElement => {
  if (type === EBreakWindowTypes.timer) {
    return <TimerBreakWindow />;
  }
  return <DefaultBreakWindow />;
};

export { BreakWindow };
