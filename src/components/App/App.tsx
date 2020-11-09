import * as React from 'react';
import View from '../View';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';
import { config } from '../../config';

import './app.scss';
import { Divider } from 'buildo-react-components/lib';

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  render() {
    return (
      <View column className="app layout" height="100%">
        <View column hAlignContent="center">
          <h1>{config.title}</h1>
          <SearchBar />
        </View>
        <Divider />
        <View style={{ height: '60%' }}>
          <SearchResults />
        </View>
      </View>
    );
  }
}

export default queries(App);
