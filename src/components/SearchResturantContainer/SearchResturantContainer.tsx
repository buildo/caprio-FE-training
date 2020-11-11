import * as React from 'react';
import * as QR from 'avenger/lib/QueryResult';
import { WithQueries } from 'avenger/lib/react';
import { SearchBar } from '../SearchBar/SearchBar';
import { FormattedMessage } from 'react-intl';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import View from '../View/View';
import Divider from '../Diveder/Divider';
import { searchResturantQuery } from '../../queries/queries';

import './searchresturantcontainer.scss';
import { ApiError } from '../../API';
import { SearchResults } from '../SearchResults/SearchResults';

export function SearchResturantContainer() {
  const [params, setParams] = React.useState<{ location: string; range: number }>({
    location: '',
    range: 0
  });

  const performSearch = async (location: string, range: number) =>
    setParams({ location: location, range: range });

  const provideLoader = () => <LoadingSpinner size={45} className="loader-overlay" />;

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
          (error: ApiError) => (
            <View grow>
              <FormattedMessage id="SearchContainer.error.generic" />
              {error.type === 'Decoding' ? (
                <h2>{`${error.type} - ${JSON.stringify(error.description)}.`}</h2>
              ) : (
                <h1>{`${JSON.stringify(error.type)}`}</h1>
              )}
            </View>
          ),
          res => (
            <View column hAlignContent="center" grow>
              <h1>{`Found ${JSON.stringify(res.searchResturantQuery.total)} resturants`}</h1>
              <SearchResults />
            </View>
          )
        )}
      />
    );

  // TODO : handle error -->  {"error": {"code": "LOCATION_NOT_FOUND", "description": "Could not execute search, try specifying a more exact location."}}

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
