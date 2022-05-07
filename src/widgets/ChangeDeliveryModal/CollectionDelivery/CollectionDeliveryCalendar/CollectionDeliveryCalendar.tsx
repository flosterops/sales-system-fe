import React, { ReactElement, useEffect, useState } from 'react';
import { Column, Row } from 'ui/Layout';
import { addDays, format, isBefore, startOfWeek, subDays } from 'date-fns';
import { Description } from 'ui/Description';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'models/layout';
import { Title, TitleTags } from 'ui/Title';
import { Button } from 'ui/Button';
import { css } from 'styled-components';
import { EButtonsVariants } from 'models/button';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { IAvailableSlot, IDeliverySlots } from 'models/calendar';
import { useFormikContext } from 'formik';
import { IInitialCollectionDelivery } from 'models/forms';
import { CalendarCell, CalendarColumnHeader, CalendarRowHeader } from './styles';
import { Delivery, ISelectedDate, TimeOfDay } from '..';

enum DaySlotNames {
  morning = 'Morning \n9am - 1pm',
  afternoon = 'Afternoon \n1pm - 7pm',
}

interface IDay {
  date: Date;
  dateFormatted: string;
}

interface ICollectionDeliveryCalendar {
  availableSlots?: IDeliverySlots | undefined;
  deliveryKeys?: string[];
  currentDelivery: Delivery | undefined;
  selectedDate: ISelectedDate;
  setSelectedDate: (value: ISelectedDate) => void;
}

const CollectionDeliveryCalendar = ({
  availableSlots,
  deliveryKeys,
  currentDelivery,
  selectedDate,
  setSelectedDate,
}: ICollectionDeliveryCalendar): ReactElement => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState<IDay[] | []>([]);

  const renderCalendar = (): void => {
    const lastMonday = startOfWeek(date, { weekStartsOn: 1 });
    const tempDayArr: IDay[] = [];
    for (let day = 0; day < 7; day++) {
      const tempDate = addDays(lastMonday, day);
      tempDayArr.push({ date: tempDate, dateFormatted: format(tempDate, 'yyyy-MM-dd') });
    }
    setDays(tempDayArr);
  };

  const formikProps = useFormikContext<IInitialCollectionDelivery>();

  const parseSlots = () => {
    const desiredKey = deliveryKeys?.find((key) => formikProps.values[key] === true);
    let slots: IAvailableSlot[] = [];
    if (availableSlots && desiredKey && desiredKey === 'home') {
      slots = availableSlots?.homeDeliverySlots;
    } else if (desiredKey) {
      const branchSlots = availableSlots?.pickupBranches.find(
        (branch) => branch.branchId === parseInt(desiredKey, 10),
      )?.availableSlots;
      if (branchSlots) {
        slots = branchSlots;
      }
    }
    return slots;
  };

  useEffect(() => {
    if (currentDelivery) {
      setSelectedDate({
        date: currentDelivery?.deliveryTime,
        timeOfDay: currentDelivery?.deliveryPeriod,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDelivery]);

  useEffect(() => {
    renderCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const nextWeek = (): void => {
    setDate((prevState: Date) => addDays(prevState, 7));
  };
  const prevWeek = (): void => {
    setDate((prevState: Date) => subDays(prevState, 7));
  };

  const isInSlots = (array: IAvailableSlot[], dayPeriod: string, day: Date) =>
    !!array.find(
      (item) =>
        item.slotTime === dayPeriod &&
        new Date(item.slotDate).getTime() === new Date(day).getTime(),
    );

  const isAllowedSlot = (day: Date, dayPeriod: string): boolean =>
    !isBefore(day, new Date()) && isInSlots(parseSlots(), dayPeriod, day);

  return (
    <Column componentWidth="auto">
      <Row jc={JustifyContentTypes.spaceBetween}>
        <Button
          variant={EButtonsVariants.white}
          icon={EIconTypes.leftChevron}
          extraIconCss={css`
            left: 22px;
            color: ${colors.primary} !important;
          `}
          onClick={() => prevWeek()}
        >
          <Description weight={WeightTypes.w700} color={colors.primary}>
            Earlier dates
          </Description>
        </Button>
        <div>
          <Title tagName={TitleTags.h4} weight={WeightTypes.w700} fontSize={FontSizeTypes.l}>
            {format(date, 'MMMM uuuu')}
          </Title>
        </div>
        <Button
          variant={EButtonsVariants.white}
          icon={EIconTypes.rightChevron}
          extraIconCss={css`
            right: 22px;
            color: ${colors.primary} !important;
          `}
          onClick={() => nextWeek()}
        >
          <Description weight={WeightTypes.w700} color={colors.primary}>
            Later dates
          </Description>
        </Button>
      </Row>
      <Row>
        <CalendarRowHeader borderRadius="10px 0 0 0" />
        {days.map((day) => (
          <CalendarColumnHeader key={`${day.dateFormatted}_header`}>
            <Description weight={WeightTypes.w800}>{format(day.date, 'cccc do')}</Description>
          </CalendarColumnHeader>
        ))}
      </Row>
      <Row>
        <CalendarRowHeader>
          <Description weight={WeightTypes.w800}>{DaySlotNames.morning}</Description>
        </CalendarRowHeader>
        {days.map((day) => (
          <CalendarCell
            key={`${day.dateFormatted}${TimeOfDay.am}`}
            active={
              selectedDate.date === day.dateFormatted &&
              selectedDate.timeOfDay === TimeOfDay.am
            }
            {...(isAllowedSlot(day.date, 'AM') && {
              allowed: true,
              onClick: () =>
                setSelectedDate({ date: day.dateFormatted, timeOfDay: TimeOfDay.am }),
            })}
          >
            <Description>{DaySlotNames.morning}</Description>
          </CalendarCell>
        ))}
      </Row>
      <Row>
        <CalendarRowHeader borderRadius="0 0 0 10px">
          <Description weight={WeightTypes.w800}>{DaySlotNames.afternoon}</Description>
        </CalendarRowHeader>
        {days.map((day) => (
          <CalendarCell
            key={`${day.dateFormatted}${TimeOfDay.pm}`}
            active={
              selectedDate.date === day.dateFormatted &&
              selectedDate.timeOfDay === TimeOfDay.pm
            }
            {...(isAllowedSlot(day.date, 'AM') && {
              allowed: true,
              onClick: () =>
                setSelectedDate({ date: day.dateFormatted, timeOfDay: TimeOfDay.pm }),
            })}
          >
            <Description>{DaySlotNames.afternoon}</Description>
          </CalendarCell>
        ))}
      </Row>
    </Column>
  );
};

export { CollectionDeliveryCalendar };
