import * as React from 'react';
import * as QR from 'avenger/lib/QueryResult';
import { WithQueries } from 'avenger/lib/react';
import { SearchBar } from '../SearchBar/SearchBar';
import { FormattedMessage } from 'react-intl';

// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import View from '../View/View';
import Divider from '../Diveder/Divider';
import { searchResturantQuery } from '../../queries/queries';

import './searchresturantcontainer.scss';
import { AppErrors } from '../../API';
import { SearchResults } from '../SearchResults/SearchResults';
import { ErrorMsg } from '../ErrorMsg/ErrorMsg';

export function SearchResturantContainer() {
  const [params, setParams] = React.useState<{ location: string; range: number }>({
    location: '',
    range: 0
  });

  const performSearch = async (location: string, range: number) =>
    setParams({ location: location, range: range });

  const provideLoader = () => <View>Loading...</View>;

  const provideResults = () =>
    !params.location ? (
      <View grow>
        <FormattedMessage id="SearchContainer.empty.list" />
      </View>
    ) : (
      <WithQueries
        queries={{ searchResturantQuery }}
        params={{ searchResturantQuery: { location: params.location, range: params.range } }}
        render={QR.fold(
          provideLoader,
          (error: AppErrors) => (
            <ErrorMsg content={error} location={params.location} />
          ),
          res => (
            <View column hAlignContent="center" grow>
              <FormattedMessage
                id="SearchContainer.search.term"
                values={{
                  location: `${params.location}`,
                  total: res.searchResturantQuery.total
                }}
              />
              <SearchResults />
            </View>
          )
        )}
      />
    );

  return (
    <View className="search-resturant-container" column grow>
      <View column hAlignContent="center" basis={400} className="header">
        <View className="title">
          <FormattedMessage id="Homepage.title" />
        </View>
        <SearchBar onSubmit={performSearch} />
      </View>
      <Divider />
      <View column hAlignContent="center" grow>
        {provideResults()}
      </View>
    </View>
  );
}
