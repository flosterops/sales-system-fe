import React, { ReactElement, useState } from 'react';
import { StyledDoubleDatePickerContainer } from 'pages/DashboardPage/TaskQueueWidget/styles';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { DatePicker } from 'widgets/Form/DatePicker';
import { colors } from 'styles/colors';
import { Stick } from './styles';

interface IRangeDateInput {
  minValue: Date | null;
  maxValue: Date | null;
  minSetValue: (value: string) => void;
  maxSetValue: (value: string) => void;
  componentWidth?: string;
}

const RangeDateInput = ({
  minValue,
  maxValue,
  minSetValue,
  maxSetValue,
  componentWidth = '200px',
}: IRangeDateInput): ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <StyledDoubleDatePickerContainer
      ai={AlignItemsTypes.center}
      jc={JustifyContentTypes.spaceBetween}
      componentWidth={componentWidth}
      isFocused={isFocused}
    >
      <DatePicker
        name="timeLt"
        value={minValue}
        className="filter-input"
        color={colors.primary}
        helpers={{ setValue: minSetValue }}
        placeholder="From"
        datePickerProps={{
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
      />
      <Stick />
      <DatePicker
        name="timeGte"
        value={maxValue}
        className="filter-input"
        color={colors.primary}
        helpers={{ setValue: maxSetValue }}
        placeholder="To"
        datePickerProps={{
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
      />
    </StyledDoubleDatePickerContainer>
  );
};

export { RangeDateInput };
