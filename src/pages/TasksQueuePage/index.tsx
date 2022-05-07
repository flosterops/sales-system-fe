import React, { ReactElement, useMemo, useState } from 'react';
import { Row } from 'ui/Layout';
import { SearchInput } from 'pages/DashboardPage/SearchInput';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { Title, TitleTags } from 'ui/Title';
import { Box } from 'ui/Box';
import { EFontFamilies, FontSizeTypes, JustifyContentTypes } from 'models/layout';
import {
  getFilterableTaskQueueColumns,
  mapDashboardTaskToTable,
} from 'pages/DashboardPage/TaskQueueWidget/helpers';
import { Pagination } from 'widgets/Pagination';
import { ESortDirectionTypes, ISortOptions } from 'models/table';
import { useDebounce } from 'helpers/useDebounce';
import { useFetchTasks } from './hooks';
import { StyledTable, TasksQueueContainer } from './styles';

const TasksQueuePage = (): ReactElement => {
  const [sort, setSort] = useState<ISortOptions>({
    property: 'createdOn',
    direction: ESortDirectionTypes.ASC,
  });
  const [filters, setFilters] = useState<Record<string, string | Date | null>>({
    orderId: '',
    taskDisplayName: '',
    assignedTo: '',
    createdOnLt: null,
    createdOnGte: null,
    websiteUser: '',
    vrm: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedFilters = useDebounce<Record<string, string | Date | null>>(filters, 1000);

  const { tasks, totalPages, pageNumber, setTrigger } = useFetchTasks({
    currentPage: currentPage - 1,
    sort,
    filters: debouncedFilters,
  });

  const tableColumns = useMemo(
    () =>
      getFilterableTaskQueueColumns(
        setFilters,
        setTrigger,
        { createdOnLt: filters.createdOnLt, createdOnGte: filters.createdOnGte },
        pageNumber,
      ),
    [setFilters, setTrigger, filters.createdOnLt, filters.createdOnGte, pageNumber],
  );
  const dataSource = tasks !== null ? mapDashboardTaskToTable(tasks) : null;

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput />
      </Row>
      <Row padding="0 40px" jc={JustifyContentTypes.center}>
        <TasksQueueContainer>
          <Title
            tagName={TitleTags.h2}
            fontFamily={EFontFamilies.bree}
            fontSize={FontSizeTypes.l}
          >
            Tasks queue
          </Title>
          <Box mbottom="22px" mtop="22px">
            <StyledTable
              columns={tableColumns}
              dataSource={dataSource}
              isSortable
              onSort={setSort}
              currentSortableColumn={sort.property}
              notSortableFields={['id']}
            />
          </Box>
          {!!totalPages && (
            <Row mbottom="44px">
              <Pagination
                current={currentPage}
                pageSize={10}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            </Row>
          )}
        </TasksQueueContainer>
      </Row>
    </>
  );
};

export { TasksQueuePage };
