import React, { ReactElement } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ISpaceTypes } from 'models/layout';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { format } from 'date-fns';
import { IStyledInput } from '../Input/styles';
import { DatePickerContainer, StyledDatePicker, StyledLabel } from './styles';

export interface IDatePicker {
  name: string;
  value: string | Date | null;
  color?: string;
  icon?: EIconTypes;
  label?: string;
  error?: string;
  helpers: {
    setValue: (value: string) => void;
  };
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  datePickerProps?: IDatePickerSpecialOptions;
  touched?: boolean;
}

export interface IDatePickerSpecialOptions {
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  dateFormat?: string;
  // Should i save in state with date format ?
  forceSaveFormat?: boolean;
  minDate?: Date;
  minTime?: Date;
  inputRef?: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export type TDatePicker = IStyledInput & IDatePicker & ISpaceTypes;

const DatePicker = ({
  color = colors.primary,
  disabled = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error = '',
  value,
  label,
  icon,
  name,
  className,
  helpers,
  touched,
  placeholder,
  datePickerProps = {},
}: IDatePicker): ReactElement => {
  const {
    showTimeSelect = false,
    showTimeSelectOnly = false,
    dateFormat = 'dd/MM/yyyy',
    forceSaveFormat = false,
    minDate = null,
    minTime = undefined,
    inputRef,
    onFocus,
    onBlur,
  } = datePickerProps;
  const saveFormat = forceSaveFormat ? dateFormat : 'yyyy-MM-dd hh:mm:ss aa';

  const hasError = error && touched;
  const updatedColor = hasError ? colors.error : color;

  const onChangeHandle = (dateValue: Date) => {
    helpers.setValue(dateValue ? format(dateValue, saveFormat) : '');
  };

  const selected = value ? new Date(value) : null;
  return (
    <DatePickerContainer componentWidth="100%" color={updatedColor} icon={icon}>
      {label && (
        <StyledLabel padding="1px 10px" color={updatedColor}>
          {label}
        </StyledLabel>
      )}
      <StyledDatePicker
        selected={selected}
        className={`calendar-input ${className}`}
        color={color}
        placeholderText={placeholder}
        onChange={onChangeHandle}
        showTimeSelect={showTimeSelect}
        minDate={minDate}
        minTime={minTime}
        showTimeSelectOnly={showTimeSelectOnly}
        disabled={disabled}
        dateFormat={dateFormat}
        icon={icon}
        name={name}
        customInputRef={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </DatePickerContainer>
  );
};

export { DatePicker };
