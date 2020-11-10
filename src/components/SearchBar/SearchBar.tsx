import * as React from 'react';

import Input from '../SearchInput/SearchInput';
import Button from '../SearchButton/SearchButton';

import Dropdown from '../Dropdown';
import View from '../View/View';
import { RangeList, RangeOption, SearchBarState } from '../../model';
import { useIntl } from 'react-intl';

import './searchbar.scss';

const RANGES: Array<number> = [1, 5, 10, 15, 25, 35, 50];

export function SearchBar() {
  const intl = useIntl();

  const btnSearchLabel = intl.formatMessage({ id: 'SearchBar.button.search.cta' });
  const locationSearchPlaceholder = intl.formatMessage({
    id: 'SearchBar.input.location.placeholder'
  });

  const rangeOptions: RangeList = RANGES.map(value => ({
    value: value,
    label: intl.formatMessage({ id: 'SearchBar.dropdown.range.label' }, { range: value })
  }));

  const [{ location, range }, setSearchParams] = React.useState<SearchBarState>({
    location: '',
    range: rangeOptions[0]
  });

  const updateLocation = (input: string) => setSearchParams({ location: input, range });

  const updateRange = (rangeInput: RangeOption) =>
    setSearchParams({ location: location, range: rangeInput });

  return (
    <View vAlignContent="center" basis={400} className="search-bar">
      <Input
        className="form-field location-input"
        label="Location"
        placeholder={locationSearchPlaceholder}
        value={location}
        onChange={updateLocation}
      />

      <Dropdown options={rangeOptions} value={range} onChange={updateRange} />

      <Button className="form-field" primary label={btnSearchLabel} onClick={() => {}} />
    </View>
  );
}
