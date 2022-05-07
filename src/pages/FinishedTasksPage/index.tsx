import React, { ReactElement, useMemo, useState } from 'react';
import { Row } from 'ui/Layout';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { EFontFamilies, FontSizeTypes, JustifyContentTypes } from 'models/layout';
import { Title, TitleTags } from 'ui/Title';
import { ESortDirectionTypes, ISortOptions } from 'models/table';
import { useDebounce } from 'helpers/useDebounce';
import { Pagination } from 'widgets/Pagination';
import { Box } from 'ui/Box';
import { useFetchFinishedTasks } from './hooks';
// ToDo: add filters
// import { getFilterableFinishedTasksColumns } from './helpers';
import { finishedTasksColumns } from './helpers';
import { FinishedTasksContainer, StyledTable } from './styles';

const FinishedTasksPage = (): ReactElement => {
  const [sort, setSort] = useState<ISortOptions>({
    property: 'resolvedTime',
    direction: ESortDirectionTypes.DESC,
  });
  const [filters, setFilters] = useState<Record<string, string | Date | null>>({
    taskId: '',
    taskName: '',
    vrm: '',
    resolvedBy: '',
    resolvedDate: '',
    notes: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedFilters = useDebounce<Record<string, string | Date | null>>(filters, 1000);

  const { tasks, totalPages } = useFetchFinishedTasks({
    currentPage: currentPage - 1,
    sort,
    filters: debouncedFilters,
  });

  const tableColumns = useMemo(
    // ToDo: add filters
    // () => getFilterableFinishedTasksColumns(setFilters),
    () => finishedTasksColumns,
    [setFilters],
  );

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput />
      </Row>
      <Row padding="0 40px" jc={JustifyContentTypes.center}>
        <FinishedTasksContainer>
          <Title
            tagName={TitleTags.h2}
            fontFamily={EFontFamilies.bree}
            fontSize={FontSizeTypes.l}
          >
            Finished Tasks
          </Title>
          <Box padding="10px 30px" mtop="17px" mbottom="22px">
            <StyledTable
              columns={tableColumns}
              dataSource={tasks}
              isSortable
              onSort={setSort}
              currentSortableColumn={sort.property}
            />
          </Box>
          <Row mbottom="44px">
            {!!totalPages && (
              <Pagination
                current={currentPage}
                pageSize={10}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            )}
          </Row>
        </FinishedTasksContainer>
      </Row>
    </>
  );
};

export { FinishedTasksPage };
