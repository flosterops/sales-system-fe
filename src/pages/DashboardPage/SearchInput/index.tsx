import { FormikProps } from 'formik';
import React, { ReactElement } from 'react';
import { Form } from 'widgets/Form';
import { EIconTypes } from 'models/icons';
import { EInputTypes, IInitialSearchFormValues } from 'models/forms';
import { initialFormValues } from 'helpers/forms';
import { EButtonTypes } from 'models/button';
import { useHistory } from 'react-router-dom';
import { StyledField, HiddenButton, StyledButton } from './styles';

interface ISearchInput {
  query?: string;
}

const initialValues = initialFormValues.search;

const SearchInput = ({ query }: ISearchInput): ReactElement => {
  const history = useHistory();

  initialValues.search = query && history.location.pathname === '/search' ? query : '';

  const handleSubmit = ({ search }: IInitialSearchFormValues) => {
    if (search.trim().length) {
      history.push(`/search?query=${search.trim()}`);
    }
    return false;
  };

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps: FormikProps<IInitialSearchFormValues>): ReactElement => (
        <>
          <StyledField
            name="search"
            spaces={{ margin: '30px 0 20px 0' }}
            type={EInputTypes.text}
            placeholder="What are you searching for?"
            icon={EIconTypes.search}
            value={formikProps.values.search}
          />
          <StyledButton type={EButtonTypes.submit}>Search</StyledButton>
          <HiddenButton type={EButtonTypes.submit}>
            <></>
          </HiddenButton>
        </>
      )}
    </Form>
  );
};
export { SearchInput };
