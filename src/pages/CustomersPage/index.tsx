import React, { ReactElement, useMemo, useState } from 'react';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { Row } from 'ui/Layout';
import {
  AlignItemsTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { ESortDirectionTypes, ISortOptions } from 'models/table';
import { useDebounce } from 'helpers/useDebounce';
import { ICustomerFilters } from 'models/customer';
import { Pagination } from 'widgets/Pagination';
import { Box } from 'ui/Box';
import { Title, TitleTags } from 'ui/Title';
import { EModalTypes } from 'models/modal';
import { ECustomerModalTypes } from 'widgets/CustomerModal/helpers';
import { useModal } from 'widgets/Modal/context';
import { Button } from 'ui/Button';
import { getCustomersColumns, mapCustomersTable } from './helper';
import { CustomersContainer, StyledTable } from './styles';
import { useFetchCustomers } from './hooks';

const initialCustomerFilters = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  fullName: '',
  address: '',
};

const CustomersPage = (): ReactElement => {
  const [sort, setSort] = useState<ISortOptions>({
    property: 'id',
    direction: ESortDirectionTypes.ASC,
  });
  const { openModal } = useModal();
  const [filters, setFilters] = useState<ICustomerFilters>(initialCustomerFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedFilters = useDebounce<ICustomerFilters>(filters, 1000);
  const onSetFilters = (
    value: ICustomerFilters | ((value: ICustomerFilters) => ICustomerFilters),
  ) => {
    setCurrentPage(1);
    return setFilters(value);
  };

  const { customers, totalPages, fetchCustomers } = useFetchCustomers({
    currentPage: currentPage - 1,
    sort,
    filters: debouncedFilters,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableColumns = useMemo(() => getCustomersColumns(onSetFilters), [setFilters]);
  const dataSource = customers !== null ? mapCustomersTable(customers) : null;

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput />
      </Row>
      <Row padding="0 40px" jc={JustifyContentTypes.center}>
        <CustomersContainer>
          <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
            <Title
              tagName={TitleTags.h2}
              fontFamily={EFontFamilies.bree}
              fontSize={FontSizeTypes.l}
            >
              Customers
            </Title>
            <Button
              onClick={() =>
                openModal(EModalTypes.AddEditWebsiteUserModal, {
                  withCloseButton: true,
                  type: ECustomerModalTypes.add,
                  onWebsiteUserDataUpdated: fetchCustomers,
                })
              }
            >
              Add customer
            </Button>
          </Row>
          <Box margin="22px 0">
            <StyledTable
              columns={tableColumns}
              dataSource={dataSource}
              isSortable
              onSort={setSort}
              currentSortableColumn={sort.property}
            />
          </Box>
          <Row mbottom="44px">
            <Pagination
              current={currentPage}
              pageSize={10}
              total={totalPages}
              onChange={(page) => setCurrentPage(page)}
            />
          </Row>
        </CustomersContainer>
      </Row>
    </>
  );
};
export { CustomersPage };
