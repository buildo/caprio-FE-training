import * as React from 'react';
import View from '../View';

import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';

import './app.scss';
import { SearchResturantContainer } from '../SearchResturantContainer/SearchResturantContainer';

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  render() {
    return (
      <View className="app layout">
        <SearchResturantContainer />
      </View>
    );
  }
}

export default queries(App);
