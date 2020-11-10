import * as React from 'react';
import View from '../View';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';

import { declareQueries } from 'avenger/lib/react';
import { currentView } from '../../queries';
import { config } from '../../config';

import './app.scss';
import Divider from '../Diveder/Divider';

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  render() {
    return (
      <View column className="app layout">
        <View column hAlignContent="center" className="header" basis={300}>
          <h1 className="title">{config.title}</h1>
          <SearchBar />
        </View>
        <Divider />
        <View grow>
          <SearchResults />
        </View>
      </View>
    );
  }
}

export default queries(App);
