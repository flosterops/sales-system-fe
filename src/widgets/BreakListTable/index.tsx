import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from 'store';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { loadTimeTrackDashboardDispatch } from 'requests/time-track';
import { mapDashboardTimeTrackToTable } from 'helpers/time-track';
import { startOfDay, endOfDay, formatISO } from 'date-fns';
import { setTimeTrack } from 'store/reducers/time-track';
import { StyledTable } from './styles';
import { breakListColumns } from './helpers';

const getDateForCriteria = (): { breakStartTimeGte: string; breakStartTimeLt: string } => {
  const currentDate = new Date();
  return {
    breakStartTimeGte: formatISO(startOfDay(currentDate)),
    breakStartTimeLt: formatISO(endOfDay(currentDate)),
  };
};

const BreakListTable = () => {
  const { list } = useSelector((state: TStore) => ({
    list: state.timeTrack.list,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = Cookies.get(ECookiesTypes.accessToken);

        if (token) {
          const data = await loadTimeTrackDashboardDispatch(token, {
            criteria: getDateForCriteria(),
            page: {},
          });
          dispatch(setTimeTrack(data.data));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  const dataSource = list !== null ? mapDashboardTimeTrackToTable(list) : null;

  return (
    <>
      <StyledTable columns={breakListColumns} dataSource={dataSource as any} isSortable />
    </>
  );
};

export default BreakListTable;
