import { differenceInMinutes, format } from 'date-fns';
import { IDashboardTimeTrack } from '../models/time-track';

export const getTotalBreakTime = (start: string, end: string): number =>
  Math.abs(differenceInMinutes(new Date(start), new Date(end)));

export const getBreakTimeFormatted = (start: string, end: string): string => {
  const dateStart = new Date(start);
  const dateEnd = new Date(end);

  return `${format(dateStart, 'p')} - ${format(dateEnd, ' p')}`;
};

export const mapDashboardTimeTrackToTable = (data: IDashboardTimeTrack[]) =>
  data.map((el) => ({
    id: `${el.firstName} ${el.lastName} ${el.breakStart}`,
    fullName: el.firstName && el.lastName ? `${el.firstName} ${el.lastName}` : '',
    breakTime: getBreakTimeFormatted(el.breakStart, el.breakEnd).toLowerCase(),
    total: `${getTotalBreakTime(el.breakStart, el.breakEnd)} min`,
    status: el.breakStatus,
  }));
