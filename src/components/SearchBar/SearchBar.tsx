import * as React from 'react';

import { Input, Button } from 'buildo-react-components';
import Dropdown from '../Dropdown';
import View from '../View/View';
import { RangeList, RangeOption, SearchBarState } from '../../model';
import { useIntl } from 'react-intl';

import './searchbar.scss';

const rangeOptions: RangeList = [
  { value: 1, label: '1 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 15, label: '15 km' },
  { value: 25, label: '25 km' },
  { value: 35, label: '35 km' },
  { value: 50, label: '50 km' }
];

export function SearchBar() {
  const [{ location, range }, setSearchParams] = React.useState<SearchBarState>({
    location: '',
    range: rangeOptions[0]
  });

  const locationSearchPlaceholder = useIntl().formatMessage({
    id: 'SearchBar.input.location.placeholder'
  });

  const btnSearchLabel = useIntl().formatMessage({
    id: 'SearchBar.button.search.cta'
  });

  const updateLocation = (input: string) => setSearchParams({ location: input, range });

  const updateRange = (rangeInput: RangeOption) =>
    setSearchParams({ location: location, range: rangeInput });

  return (
    <View vAlignContent="center" basis={300} className="search-bar">
      <Input
        label="Location"
        placeholder={locationSearchPlaceholder}
        value={location}
        onChange={updateLocation}
      />

      <Dropdown
        className="form-field"
        options={rangeOptions}
        value={range}
        onChange={updateRange}
      />

      <Button className="form-field" label={btnSearchLabel} onClick={() => {}} />
    </View>
  );
}
