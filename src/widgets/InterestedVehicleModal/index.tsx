import { format } from 'date-fns';
import { ERouteLinks } from 'models/route';
import React from 'react';
import { colors } from 'styles/colors';
import { Box } from 'ui/Box';
import { TableRow, TableTd, THeadTitle } from 'widgets/Table/styles';
import { useFetchVehicleInterests } from './hooks';
import {
  LinkStyle,
  StyledTableInterestedVehicle,
  TableTdStyle,
  THeadTitleStyle,
  TitleRow,
  StyledRow,
} from './styles';
import { Loader } from '../../ui/Loader';
import { OverflowTypes } from '../../models/layout';

interface IInterestVehicle {
  id: number;
  closeModal: () => void;
}

const InterestedVehicleModal = ({ id, closeModal }: IInterestVehicle) => {
  const { data, vehicleName, loading } = useFetchVehicleInterests(id);

  if (loading || !data) {
    return <Loader />;
  }
  return (
    <Box componentWidth="548px" padding="30px">
      <TitleRow>Intrested in {vehicleName}</TitleRow>
      <StyledRow overflow={OverflowTypes.scroll}>
        <StyledTableInterestedVehicle>
          <thead>
            <TableRow borderColor={colors.primary}>
              <THeadTitle isSortable={false}>Full Name</THeadTitle>
              <THeadTitleStyle isSortable={false}>Date</THeadTitleStyle>
            </TableRow>
          </thead>
          <tbody>
            {data.map((item, key) => {
              const websiteUserId = item.websiteUser.id;
              return (
                <TableRow key={key.toString()} borderColor={colors.border}>
                  <TableTd>
                    <LinkStyle
                      onClick={closeModal}
                      color={colors.primary}
                      to={
                        ERouteLinks.customerDetails.replace(
                          ':id',
                          websiteUserId.toString(),
                        ) as ERouteLinks
                      }
                    >
                      {item.websiteUser.firstname} {item.websiteUser.lastname}
                    </LinkStyle>
                  </TableTd>
                  <TableTdStyle>
                    {format(new Date(item.createdOn), 'dd.MM.yyyy hh:mm a')}
                  </TableTdStyle>
                </TableRow>
              );
            })}
          </tbody>
        </StyledTableInterestedVehicle>
      </StyledRow>
    </Box>
  );
};
export { InterestedVehicleModal };
