import React, { ReactElement } from 'react';
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';
import { EFieldTypes, EInputTypes, TFieldTypes } from 'models/forms';
import { Input } from 'widgets/Form/Input';
import { FieldConfig } from 'formik/dist/Field';
import { Column } from 'ui/Layout';
import { Description } from 'ui/Description';
import {
  AlignItemsTypes,
  FontSizeTypes,
  ISpaceTypes,
  JustifyContentTypes,
} from 'models/layout';
import { colors } from 'styles/colors';
import { ISelectOptionsModel, ISpecialSelectOptions, Select } from 'widgets/Form/Select';
import { EIconTypes } from 'models/icons';
import { Checkbox } from 'widgets/Form/Checkbox';
import { Autocomplete, ISpecialAutocompleteOptions } from 'widgets/Form/Autocomplete';
import { DatePicker } from 'widgets/Form/DatePicker';
import { UploadFiles } from 'widgets/Form/Upload';
import FilesViews from 'widgets/Form/Upload/FilesViews';
import { Textarea } from '../Textarea';
import { IDatePickerSpecialOptions } from '../DatePicker';

interface IFieldComponent {
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
  helpers: FieldHelperProps<any>;
  name: string;
  height?: string;
  type: TFieldTypes;
  options?: ISelectOptionsModel[];
  selectProps?: ISpecialAutocompleteOptions | ISpecialSelectOptions;
  datePickerProps?: IDatePickerSpecialOptions;
  placeholder?: string;
  disabled?: boolean;
  value: any;
  onChange?: (...args: any) => void;
}

export const FieldComponent = ({
  field,
  helpers,
  meta,
  name,
  type,
  onChange,
  options = [],
  selectProps = {},
  value,
  ...props
}: IFieldComponent): ReactElement => {
  switch (type) {
    case EFieldTypes.autocomplete:
      return (
        <Autocomplete
          {...props}
          {...field}
          {...meta}
          value={value}
          disabled={props.disabled}
          name={name}
          helpers={helpers}
          selectProps={selectProps}
        />
      );
    case EFieldTypes.checkbox:
      return (
        <Checkbox
          {...props}
          {...field}
          {...meta}
          name={name}
          helpers={helpers}
          onChange={onChange || field.onChange}
        />
      );
    case EFieldTypes.filesViews:
      return <FilesViews {...props} {...field} {...meta} helpers={helpers} />;
    case EFieldTypes.datetime:
      return <DatePicker {...props} {...field} {...meta} helpers={helpers} />;
    case EFieldTypes.select:
      return (
        <Select
          {...props}
          {...field}
          {...meta}
          options={options}
          name={name}
          helpers={helpers}
          selectProps={selectProps}
          onChange={onChange || field.onChange}
        />
      );
    case EInputTypes.files:
      return <UploadFiles {...props} {...field} {...meta} helpers={helpers} name={name} />;
    case EFieldTypes.textarea:
      return <Textarea {...props} {...field} {...meta} helpers={helpers} name={name} />;
    case EInputTypes.number:
    case EInputTypes.password:
    case EInputTypes.search:
    case EInputTypes.email:
    case EInputTypes.text:
    default:
      return (
        <Input
          {...props}
          {...field}
          {...meta}
          helpers={helpers}
          name={name}
          type={type as EInputTypes}
          onChange={onChange || field.onChange}
        />
      );
  }
};

export interface IField extends FieldConfig {
  name: string;
  type: TFieldTypes;
  // Can be only string | number | boolean | array
  value?: any;
  spaces?: ISpaceTypes;
  jc?: JustifyContentTypes;
  ai?: AlignItemsTypes;
  color?: string;
  options?: ISelectOptionsModel[];
  selectProps?: ISpecialSelectOptions | ISpecialAutocompleteOptions;
  datePickerProps?: IDatePickerSpecialOptions;
  placeholder?: string;
  icon?: EIconTypes;
  label?: string;
  onChange?: (...args: any) => void;
  disabled?: boolean;
  height?: string;
  getOptionValue?: (...args: any) => void;
  endAdornment?: ReactElement;
  accept?: string;
  multiple?: boolean;
  hasError?: boolean;
}

export const Field = ({
  type,
  color,
  spaces = {},
  jc,
  ai,
  hasError = true,
  value,
  ...props
}: IField): ReactElement => {
  const [field, meta, helpers] = useField(props);
  const showError = !!meta.error && meta.touched && hasError;

  return (
    <Column componentWidth="100%" {...spaces} jc={jc} ai={ai}>
      <FieldComponent
        {...props}
        value={value}
        field={field}
        meta={meta}
        type={type}
        name={props.name}
        helpers={helpers}
      />
      {showError && (
        <Description mtop="6px" fontSize={FontSizeTypes.s} color={colors.error}>
          {meta.error}
        </Description>
      )}
    </Column>
  );
};
