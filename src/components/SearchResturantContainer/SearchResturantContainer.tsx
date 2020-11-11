import * as React from 'react';
import View from '../View/View';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import Divider from '../Diveder/Divider';
import { FormattedMessage } from 'react-intl';

import './searchresturantcontainer.scss';

export function SearchResturantContainer() {
  const performSearch = (location: string, range: number) =>
    alert(`You want to search resturant in ${location} around ${range} km`);

  return (
    <View className="search-resturant-container" column grow>
      <View column hAlignContent="center" className="header" basis={400}>
        <View className="title">
          <FormattedMessage id="Homepage.title" />
        </View>
        <SearchBar onSubmit={performSearch} />
      </View>
      <Divider />
      <View grow>
        <SearchResults />
      </View>
    </View>
  );
}
