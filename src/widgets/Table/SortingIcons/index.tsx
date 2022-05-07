import React, { FC } from 'react';
import { EIconTypes } from 'models/icons';
import { Icon } from 'ui/Icon';
import { colors } from 'styles/colors';
import { SortingIconsWrapper } from './styles';
import { ESortingIconType } from './types';

interface ISortingIcons {
  sortingType: ESortingIconType;
}

const defineIconType = (type: ESortingIconType) => {
  switch (type) {
    case ESortingIconType.ASC:
      return EIconTypes.sortUp;
    case ESortingIconType.DESC:
      return EIconTypes.sortDown;
    default:
      return EIconTypes.sort;
  }
};

const defineIconColor = (type: ESortingIconType) => {
  if (type === ESortingIconType.inactive) {
    return colors.border;
  }
  return colors.primary;
};

const SortingIcons: FC<ISortingIcons> = ({ sortingType }) => (
  <SortingIconsWrapper>
    <Icon
      type={defineIconType(sortingType)}
      color={defineIconColor(sortingType)}
      fontSize="13px"
    />
  </SortingIconsWrapper>
);

export { SortingIcons };
