import React, { useState } from 'react';
import { Header } from 'widgets/Header';
import { NavBar } from 'widgets/NavBar';
import { Column, Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { FontSizeTypes, JustifyContentTypes, WeightTypes } from 'models/layout';
import { Pagination } from 'widgets/Pagination';
import { SearchInput } from '../DashboardPage/SearchInput';
import { useSearch } from './hooks';
import { SearchItem } from './SearchItem';

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { queryString, results, totalPages } = useSearch({ currentPage: currentPage - 1 });

  return (
    <>
      <Header />
      <NavBar />
      <Row componentWidth="50vw" margin="30px auto">
        <SearchInput query={queryString} />
      </Row>

      {results && (
        <Column componentWidth="75vw" margin="10px auto">
          {results.length === 0 ? (
            <Row jc={JustifyContentTypes.center}>
              <Description
                weight={WeightTypes.w700}
                fontSize={FontSizeTypes.xxm}
                color={colors.textDisabled}
              >
                Sorry, there are no results matching your search criteria
              </Description>
            </Row>
          ) : (
            <>
              {results.map((result) => (
                <SearchItem result={result} key={result.vehicleId} />
              ))}
              <Row mbottom="44px">
                {totalPages !== 1 && (
                  <Pagination
                    current={currentPage}
                    pageSize={10}
                    total={totalPages}
                    onChange={(page) => setCurrentPage(page)}
                  />
                )}
              </Row>
            </>
          )}
        </Column>
      )}
    </>
  );
};

export { SearchPage };
