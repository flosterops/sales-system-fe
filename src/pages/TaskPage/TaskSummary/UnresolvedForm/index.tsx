import React, { ReactElement } from 'react';
import { Row } from 'ui/Layout';
import { Form } from 'widgets/Form';
import { initialTaskSummaryUnresolvedFormValues } from 'helpers/forms';
import { EFieldTypes, IInitialTaskSummaryUnresolvedFormValues } from 'models/forms';
import { FormikProps } from 'formik';
import { Field } from 'widgets/Form/Field';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { AlignItemsTypes, ComponentSizesTypes, JustifyContentTypes } from 'models/layout';
import { searchUsers } from 'requests/business-user';
import { IBusinessUser, IBusinessUserRequestData } from 'models/business-user';
import { ISpecialAutocompleteOptions } from 'widgets/Form/Autocomplete';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { EIconTypes } from 'models/icons';
import { isRequired } from 'widgets/Form/validations';
import { StyledColumn } from './style';

interface IUnresolvedForm {
  onSubmit: (...args: any) => void;
}

const datePickerSpecialProps = {
  dateFormat: 'MMM dd yyyy',
  minDate: new Date(),
  minTime: new Date(),
};
const timePickerSpecialProps = {
  dateFormat: 'h:mm aa',
  showTimeSelect: true,
  showTimeSelectOnly: true,
  minDate: new Date(),
};

const businessUserRequestData: IBusinessUserRequestData = {
  criteria: {
    phrase: '',
    active: true,
  },
  page: {
    pageNumber: 0,
    pageSize: 10,
  },
};

const mapResponseUserDataForAutocomplete = (data: IBusinessUser[]) =>
  data.map((el) => ({
    label: `${el.firstName} ${el.lastName}`,
    value: el.id,
  }));

const UnresolvedForm = ({ onSubmit }: IUnresolvedForm): ReactElement => {
  const loadSuggestions = async (value: string) => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      businessUserRequestData.criteria.phrase = value;
      const data = await searchUsers(token, businessUserRequestData);

      if (data.length) {
        return mapResponseUserDataForAutocomplete(data);
      }
    }

    return [];
  };

  const selectProps: ISpecialAutocompleteOptions = {
    loadSuggestions,
  };

  return (
    <Form
      initialValues={initialTaskSummaryUnresolvedFormValues}
      onSubmit={onSubmit}
      validations={{
        time: [isRequired()],
        date: [isRequired()],
        note: [isRequired()],
      }}
    >
      {(formikProps: FormikProps<IInitialTaskSummaryUnresolvedFormValues>): ReactElement => (
        <>
          <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.center} wrap mbottom="30px">
            <Field
              name="note"
              type={EFieldTypes.textarea}
              value={formikProps.values.note}
              height="100px"
              label="Note *"
              placeholder="Note"
            />
          </Row>
          <Row jc={JustifyContentTypes.center} wrap gap="30px">
            <StyledColumn>
              <Field
                name="date"
                type={EFieldTypes.datetime}
                value={formikProps.values.date}
                datePickerProps={datePickerSpecialProps}
                label="Date *"
                placeholder="Date"
              />
            </StyledColumn>
            <StyledColumn>
              <Field
                name="time"
                type={EFieldTypes.datetime}
                value={formikProps.values.time}
                datePickerProps={timePickerSpecialProps}
                label="Time *"
                placeholder="Time"
              />
            </StyledColumn>
            <StyledColumn>
              <Field
                name="user"
                type={EFieldTypes.autocomplete}
                value={formikProps.values.user}
                selectProps={selectProps}
                label="Assign to"
                placeholder="Assign to"
              />
            </StyledColumn>
          </Row>
          <Row componentWidth="1" ptop="18px">
            <Button
              mleft="auto"
              type={EButtonTypes.submit}
              componentSize={ComponentSizesTypes.m}
              icon={EIconTypes.check}
            >
              Save
            </Button>
          </Row>
        </>
      )}
    </Form>
  );
};

export { UnresolvedForm };
