import { ISelectStyleOptions } from 'models/forms';
import { getDefaultSelectStyle, getFilterSelectStyle, getSmoothSelectStyle } from './styles';

export const selectStyles = {
  default: getDefaultSelectStyle,
  filter: getFilterSelectStyle,
  smooth: getSmoothSelectStyle,
};

export const getSelectStyles = (options: ISelectStyleOptions) => ({
  default: getDefaultSelectStyle(options),
  filter: getFilterSelectStyle(options),
  smooth: getSmoothSelectStyle(options),
});
