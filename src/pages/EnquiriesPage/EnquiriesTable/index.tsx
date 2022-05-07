import { useDebounce } from 'helpers/useDebounce';
import { ESortDirectionTypes, ISortOptions } from 'models/table';
import React, { ReactElement, useMemo, useState } from 'react';
import { Pagination } from 'widgets/Pagination';
import { IEmailMessageListFilters } from 'models/email-message';
import { Box } from 'ui/Box';
import { Row } from 'ui/Layout';
import { useFetchEnquires } from './hook';
import { getEnquiriesColumns, mapEnquiresToTable } from './helper';
import { EnquiresContainer, StyledTable } from './style';

const EnquiriesTable = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<ISortOptions>({
    property: 'date',
    direction: ESortDirectionTypes.ASC,
  });
  const [filters, setFilters] = useState({
    date: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
    fullName: '',
  });

  const debouncedFilters = useDebounce<IEmailMessageListFilters>(filters, 1000);

  const { messages, totalPages } = useFetchEnquires({
    currentPage: currentPage - 1,
    sort,
    filters: debouncedFilters,
  });

  const tableColumns = useMemo(
    () =>
      getEnquiriesColumns(
        {
          date: filters.date,
        },
        setFilters,
      ),
    [setFilters, filters.date],
  );
  const dataSource = messages !== null ? mapEnquiresToTable(messages) : null;

  return (
    <EnquiresContainer>
      <Box mbottom="22px" mtop="22px">
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
    </EnquiresContainer>
  );
};

export { EnquiriesTable };
