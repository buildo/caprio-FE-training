import React from 'react';
import View from '../View';
import { FormattedMessage } from 'react-intl';

import './searchresults.scss';

const mockList: string[] = ['Item 1', 'Item 2', 'Item 3'];

const SearchResults: React.FC = () => {
  return (
    <View className="search-results" column hAlignContent={'center'}>
      <h2 className="container-title">
        <FormattedMessage id="Homepage.results.title" />
      </h2>
      {mockList.map(name => (
        <View className="result-item" hAlignContent={'center'}>
          - {name}
        </View>
      ))}
    </View>
  );
};

export default SearchResults;
