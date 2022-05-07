import React, { FunctionComponent, ReactElement } from 'react';
import { colors } from 'styles/colors';
import { ISpaceTypes } from 'models/layout';
import { EIconTypes } from 'models/icons';
import { FieldHelperProps } from 'formik';
import { StyledField, StyledTextarea, StyledLabel } from './styles';

export interface ITextarea extends ISpaceTypes {
  name: string;
  value: string;
  color?: string;
  icon?: EIconTypes;
  label?: string;
  resize?: string;
  onChange?: (...args: any) => void;
  onBlur: (...args: any) => void;
  placeholder?: string;
  helpers: FieldHelperProps<string>;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
  height?: string;
  endAdornment?: ReactElement;
}

const Textarea: FunctionComponent<ITextarea> = ({
  color = colors.primary,
  label = '',
  placeholder = '',
  disabled = false,
  error = '',
  icon,
  name,
  touched,
  resize,
  endAdornment,
  value,
  height,
  onChange,
  onBlur,
  className,
}: ITextarea): ReactElement => {
  const hasError = error && touched;
  const updatedColor = hasError ? colors.error : color;

  return (
    <StyledField className={className} color={updatedColor}>
      {label && (
        <StyledLabel padding="1px 10px" color={updatedColor}>
          {label}
        </StyledLabel>
      )}
      <StyledTextarea
        resize={resize}
        height={height}
        onChange={onChange}
        onBlur={onBlur}
        icon={icon}
        color={updatedColor}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      {!!endAdornment && endAdornment}
    </StyledField>
  );
};

export { Textarea };
