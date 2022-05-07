import React, { ReactElement, useEffect, useState } from 'react';
import {
  ESortDirectionTypes,
  ISortOptions,
  ITableColumns,
  ITableDataSource,
} from 'models/table';
import { isFunction } from 'models/guards';
import { colors } from 'styles/colors';
import {
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  ISpaceTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Description } from 'ui/Description';
import { Row } from 'ui/Layout';
import {
  StyledTable,
  TableRow,
  TableTd,
  TableWrapper,
  THeadTitle,
  THeadTitleInner,
} from './styles';
import { TableFilters } from './TableFilters';
import { SortingIcons } from './SortingIcons';
import { ESortingIconType } from './SortingIcons/types';
import { Loader } from '../../ui/Loader';

interface ITable extends ISpaceTypes {
  columns: ITableColumns[];
  dataSource: ITableDataSource[] | null;
  isSortable?: boolean;
  onSort?: ({ property, direction }: ISortOptions) => void;
  currentSortableColumn?: string;
  notSortableFields?: string[];
}

const Table = ({
  columns,
  dataSource,
  isSortable = false,
  onSort = () => {},
  notSortableFields = [],
  ...props
}: ITable): ReactElement => {
  const isHasFilters = columns.some(
    ({ filterRender }: ITableColumns): boolean => !!filterRender,
  );

  const [modifiedColumns, setModifiedColumns] = useState<any[]>(columns);

  useEffect(() => {
    if (isSortable) {
      setModifiedColumns(
        columns.map((column: ITableColumns) => ({
          ...column,
          property: column.key,
          direction: ESortDirectionTypes.ASC,
        })),
      );
    }
  }, [columns, isSortable]);

  const handleSort = (key: string) => {
    if (!isSortable) {
      return;
    }

    const sortableOptions: ISortOptions = {
      property: '',
      direction: ESortDirectionTypes.ASC,
    };

    setModifiedColumns(
      modifiedColumns.map((column) => {
        if (column.key === key) {
          const direction =
            column.direction === ESortDirectionTypes.ASC
              ? ESortDirectionTypes.DESC
              : ESortDirectionTypes.ASC;

          sortableOptions.property = column.key;
          sortableOptions.direction = direction;
          return { ...column, direction };
        }

        return column;
      }),
    );

    onSort(sortableOptions);
  };

  const defineSortingType = (columnKey: string) => {
    if (props?.currentSortableColumn === columnKey) {
      return modifiedColumns.find((column) => column.key === columnKey).direction;
    }
    return ESortingIconType.inactive;
  };

  if (dataSource === null) {
    return <Loader />;
  }

  return (
    <TableWrapper>
      <StyledTable {...props}>
        <thead>
          <TableRow borderColor={colors.primary}>
            {modifiedColumns.map((col: ITableColumns): ReactElement => {
              const isFieldSortable = isSortable && !notSortableFields.includes(col.key);
              return (
                <THeadTitle
                  isSortable={isFieldSortable}
                  key={col.id}
                  onClick={() => isFieldSortable && handleSort(col.key)}
                >
                  <THeadTitleInner>
                    {isFunction(col.title) ? col.title(col) : col.title}
                    {isFieldSortable && (
                      <SortingIcons sortingType={defineSortingType(col.key)} />
                    )}
                  </THeadTitleInner>
                </THeadTitle>
              );
            })}
          </TableRow>
        </thead>
        <tbody>
          {isHasFilters && <TableFilters columns={columns} />}
          {!!dataSource &&
            dataSource.map((data: ITableDataSource, index): ReactElement => {
              if (!('id' in data)) {
                console.error("Source data hasn't id field. It's required");
              }
              return (
                <TableRow key={data.id} borderColor={colors.border}>
                  {columns.map(({ key, render, width }: ITableColumns): ReactElement => {
                    if (!(key in data)) {
                      console.error(`dataSource doesn't have key of ${key} in columns`);
                    }
                    return (
                      <TableTd key={`${data.id}_${key}`} width={width}>
                        {isFunction(render) ? render(data[key], data, index) : data[key]}
                      </TableTd>
                    );
                  })}
                </TableRow>
              );
            })}
        </tbody>
      </StyledTable>
      {!dataSource?.length && (
        <Row jc={JustifyContentTypes.center} mtop="60px" mbottom="36px">
          <Description
            fontFamily={EFontFamilies.bree}
            fontSize={FontSizeTypes.l}
            color={colors.black}
            opacity={0.4}
            textAlign={AlignTextTypes.center}
          >
            Sorry, there is no data to display
          </Description>
        </Row>
      )}
    </TableWrapper>
  );
};

export { Table };
