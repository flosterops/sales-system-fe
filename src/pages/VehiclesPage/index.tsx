import React, { ReactElement, useMemo, useState } from 'react';
import { Row } from 'ui/Layout';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { Title, TitleTags } from 'ui/Title';
import { EFontFamilies, FontSizeTypes, JustifyContentTypes } from 'models/layout';
import { Pagination } from 'widgets/Pagination';
import { ESortDirectionTypes, ISortOptions } from 'models/table';
import { useDebounce } from 'helpers/useDebounce';
import { Box } from 'ui/Box';
import { VehiclesContainer, StyledTable } from './styles';
import { useFetchVehicles } from './hooks';
import { getVehiclesColumns, mapVehicles } from '../DashboardPage/VehiclesWidget/helpers';
import { IVehicleFilters } from './types';

const initialVehicleFilters = {
  stockId: '',
  registration: '',
  make: '',
  model: '',
  modelVariant: '',
  mileageMin: null,
  mileageMax: null,
  daysInStock: null,
  priceMin: null,
  priceMax: null,
  status: '',
};

const VehiclesPage = (): ReactElement => {
  const [sort, setSort] = useState<ISortOptions>({
    property: 'stockId',
    direction: ESortDirectionTypes.ASC,
  });
  const [filters, setFilters] = useState<IVehicleFilters>(initialVehicleFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedFilters = useDebounce<IVehicleFilters>(filters, 1000);
  const onSetFilters = (
    value: IVehicleFilters | ((value: IVehicleFilters) => IVehicleFilters),
  ) => {
    setCurrentPage(1);
    return setFilters(value);
  };

  const { vehicles, totalPages } = useFetchVehicles({
    currentPage: currentPage - 1,
    sort,
    filters: debouncedFilters,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableColumns = useMemo(() => getVehiclesColumns(onSetFilters), [setFilters]);
  const dataSource = vehicles !== null ? mapVehicles(vehicles) : null;

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput />
      </Row>
      <Row padding="0 40px" jc={JustifyContentTypes.center}>
        <VehiclesContainer>
          <Title
            tagName={TitleTags.h2}
            fontFamily={EFontFamilies.bree}
            fontSize={FontSizeTypes.l}
          >
            Vehicles
          </Title>
          <Box mbottom="22px" mtop="22px">
            <StyledTable
              columns={tableColumns}
              dataSource={dataSource}
              isSortable
              onSort={setSort}
              currentSortableColumn={sort.property}
            />
          </Box>
          {!!totalPages && null}
          <Row mbottom="44px">
            <Pagination
              current={currentPage}
              pageSize={10}
              total={totalPages}
              onChange={(page) => setCurrentPage(page)}
            />
          </Row>
        </VehiclesContainer>
      </Row>
    </>
  );
};

export { VehiclesPage };
