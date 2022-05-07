import React, { ReactElement, useRef } from 'react';
import { getSelectStyles } from 'widgets/Form/Select/helpers';
import { Row } from 'ui/Layout';
import { AlignItemsTypes } from 'models/layout';
import { StyledSelect } from 'widgets/Form/Select/styles';
import { DropdownIndicator } from 'widgets/Form/Select/components';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { colors } from 'styles/colors';

export interface ISelectInput {
  options: ISelectOptionsModel[];
  onChange: (...args: any) => void;
  name: string;
  placeholder?: string;
  color?: string;
  defaultValue?: string;
}

const SelectInput = ({
  options,
  onChange,
  name,
  placeholder,
  color = colors.primary,
}: ISelectInput): ReactElement => {
  const ref = useRef<HTMLSelectElement | null>(null);

  const styles = getSelectStyles({ color, hasIcon: false }).filter;

  return (
    <Row ai={AlignItemsTypes.center}>
      <StyledSelect
        id={name}
        name={name}
        options={options}
        placeholder={placeholder}
        ref={ref as any}
        onChange={onChange}
        color={color}
        isClearable={false}
        isSearchable={false}
        blurInputOnSelect
        components={{ DropdownIndicator }}
        // @ts-ignore
        styles={styles}
      />
    </Row>
  );
};

export { SelectInput };
