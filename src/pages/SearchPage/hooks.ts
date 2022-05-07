import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getSearchResults } from 'requests/search';
import { ECookiesTypes } from 'models/cookies';
import { ISearchVehicle } from 'models/search';
import { isResponseError } from 'models/guards';
import { useQuery } from 'helpers/use-query';
import { getImagePath } from 'helpers/images';

interface IUseSearchOptions {
  currentPage: number;
}

export const useSearch = ({ currentPage }: IUseSearchOptions) => {
  const query = useQuery();
  const [queryString, setQueryString] = useState<string>('');
  const [results, setResults] = useState<ISearchVehicle[]>();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async function getSearch() {
      const querySearch = query.get('query');
      if (querySearch && querySearch.trim().length) {
        setQueryString(querySearch);

        const token = Cookies.get(ECookiesTypes.accessToken);
        if (token) {
          const data = await getSearchResults(token, {
            criteria: {
              query: querySearch,
            },
            page: {
              pageNumber: currentPage,
              pageSize: 10,
            },
          });
          if (!isResponseError(data)) {
            const resultItems = data.data.content.map((result) => ({
              ...result,
              thumbnail: result.primaryImageFileName
                ? getImagePath(result.primaryImageFileName, { width: 400 })
                : null,
            }));
            setResults(resultItems);
            setTotalPages(data.data.totalPages);
          }
        }
      }
    })();
  }, [query, currentPage]);

  return { queryString, setQueryString, results, totalPages };
};
