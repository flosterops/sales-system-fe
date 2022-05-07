import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';
import { colors } from 'styles/colors';
import { Row } from 'ui/Layout';
import { extraIconStyles, StyledLabel } from 'widgets/Form/Input/styles';
import { SelectMenuPlacement } from 'models/forms';
import { Icon } from 'ui/Icon';
import { AlignItemsTypes } from 'models/layout';
import { isFunction } from 'models/guards';
import { getSelectStyles } from './helpers';
import { DropdownIndicator } from './components';
import { StyledAutocomplete } from './styles';
import { ISelectOptionsModel, ISelectSearchProp, ISpecialSelectOptions } from '../Select';

export interface IAutocompleteSearchProp extends Omit<ISelectSearchProp, 'options'> {
  selectProps?: ISpecialAutocompleteOptions;
  openMenuOnClick?: boolean;
  getOptionLabel?: (option: unknown) => string;
  getOptionValue?: (option: unknown) => string;
}

export interface ISpecialAutocompleteOptions extends ISpecialSelectOptions {
  cacheOptions?: boolean;
  defaultOptions?: ISelectOptionsModel[] | boolean;
  loadSuggestions?: (searchValue: string) => Promise<Array<unknown>>;
  symbolsToLoad?: number;
}

const Autocomplete: FunctionComponent<IAutocompleteSearchProp> = ({
  color = colors.primary,
  disabled,
  placeholder,
  selectProps = {},
  onBlur,
  helpers,
  openMenuOnClick = true,
  name,
  label,
  touched,
  error,
  icon,
  value,
  getOptionLabel,
  getOptionValue,
}): ReactElement => {
  const ref = useRef<HTMLSelectElement | null>(null);
  const {
    isClearable = false,
    isSearchable = true,
    cacheOptions = true,
    symbolsToLoad = 1,
    loadSuggestions,
    defaultOptions = true,
    menuPlacement = SelectMenuPlacement.default,
  } = selectProps;

  const hasError = touched && error;
  const updatedColor = hasError ? colors.error : color;
  const hasIcon = !!icon;

  const styles = getSelectStyles({ color: updatedColor, hasIcon }).default;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    onBlur(e);
  };

  const loadOptions = async (
    inputValue: string,
    callback: (options: ISelectOptionsModel[]) => void,
  ) => {
    if (inputValue.length >= symbolsToLoad && isFunction(loadSuggestions)) {
      try {
        const options = await loadSuggestions(inputValue);
        callback(options as ISelectOptionsModel[]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const [currentOption, setCurrentOption] = useState<ISelectOptionsModel>();

  useEffect(() => {
    if (value) {
      setCurrentOption(value as ISelectOptionsModel);
    }
  }, [value]);

  const handleChange = (option: ISelectOptionsModel | unknown) => {
    if (option) {
      const optionValue = isFunction(getOptionValue)
        ? getOptionValue(option)
        : (option as ISelectOptionsModel).value;
      setCurrentOption(option as ISelectOptionsModel);
      helpers.setValue(optionValue as string);
    }
  };

  return (
    <Row ai={AlignItemsTypes.center}>
      {icon && <Icon type={icon} color={updatedColor} extra={extraIconStyles} />}
      {label && (
        <StyledLabel padding="1px 10px" color={updatedColor}>
          {label}
        </StyledLabel>
      )}
      <StyledAutocomplete
        id={name}
        name={name}
        placeholder={placeholder}
        ref={ref as any}
        onBlur={handleBlur}
        color={color}
        isDisabled={disabled}
        onChange={handleChange}
        isClearable={isClearable}
        openMenuOnClick={openMenuOnClick}
        menuPlacement={menuPlacement}
        isSearchable={isSearchable}
        blurInputOnSelect
        cacheOptions={cacheOptions}
        defaultOptions={defaultOptions}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        loadOptions={loadOptions}
        components={{ DropdownIndicator }}
        value={currentOption}
        // @ts-ignore
        styles={styles}
      />
    </Row>
  );
};

export { Autocomplete };
