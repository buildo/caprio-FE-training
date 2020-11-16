import * as React from 'react';

import { SearchBar } from '../SearchBar/SearchBar';
import { FormattedMessage } from 'react-intl';

import View from '../View/View';
import Divider from '../Diveder/Divider';

import './searchresturantcontainer.scss';
import { SearchFetch } from '../SearchFetch/SearchFetch';

export function SearchResturantContainer() {
  const [params, setParams] = React.useState<{ location: string; range: number }>({
    location: '',
    range: 0
  });

  const performSearch = (location: string, range: number) =>
    setParams({ location: location, range: range });

  return (
    <View className="search-resturant-container" column grow>
      <View column vAlignContent="center" hAlignContent="center" basis={300} className="header">
        <View className="title" hAlignContent="center">
          <FormattedMessage id="Homepage.title" />
        </View>
        <SearchBar onSubmit={performSearch} />
      </View>
      <Divider />
      <View column hAlignContent="center">
        <View height={600} className="search-content" hAlignContent="center">
          <SearchFetch {...params} />
        </View>
      </View>
    </View>
  );
}
