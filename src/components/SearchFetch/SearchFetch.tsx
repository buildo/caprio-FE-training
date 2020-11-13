import * as React from 'react';

import * as queryResult from 'avenger/lib/QueryResult';
import View from '../View/View';
import { WithQueries } from 'avenger/lib/react';
import { searchResturantQuery } from '../../queries/queries';
import { FormattedMessage } from 'react-intl';
import { SearchResults } from '../SearchResults/SearchResults';
import { ErrorMsg } from '../ErrorMsg/ErrorMsg';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export function SearchFetch(props: { location: string; range: number }) {
  const provideLoader = () => <LoadingSpinner />;

  return !props.location ? (
    <View grow>
      <FormattedMessage id="SearchContainer.empty.list" />
    </View>
  ) : (
    <WithQueries
      queries={{ searchResturantQuery }}
      params={{ searchResturantQuery: { location: props.location, range: props.range } }}
      render={queryResult.fold(
        provideLoader,
        error => (
          <ErrorMsg content={error} location={props.location} />
        ),
        res => (
          <View column hAlignContent="center" grow>
            <FormattedMessage
              id="SearchContainer.search.term"
              values={{
                location: `${props.location}`,
                total: res.searchResturantQuery.total
              }}
            />
            <SearchResults />
          </View>
        )
      )}
    />
  );
}
