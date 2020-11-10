import * as React from 'react';

import { Input, Button } from 'buildo-react-components';
import Dropdown from '../Dropdown';
import View from '../View/View';

const rangeOptions = [
  { value: 1, label: '1 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 15, label: '15 km' },
  { value: 25, label: '25 km' },
  { value: 35, label: '35 km' },
  { value: 50, label: '50 km' }
];

export function SearchBar() {
  return (
    <View hAlignContent="center" vAlignContent="center" basis={300} className="search-bar">
      <form>
        <View vAlignContent="center">
          <Input label="" placeholder="" value="" onChange={() => {}} />

          <Dropdown
            options={rangeOptions}
            value={{ value: 1, label: '1 km' }}
            onChange={() => {}}
          />

          <Button
            label="Search"
            flat
            onClick={() => {
              /*TODO : Handle Range changes*/
            }}
            style={{ margin: 10, width: 100 }}
          />
        </View>
      </form>
    </View>
  );
}
