import * as React from 'react';

import Input from '../SearchInput/SearchInput';
import Button from '../SearchButton/SearchButton';
import Dropdown from '../Dropdown';
import View from '../View/View';
import {
  RangeList,
  RangeOption,
  SearchBarProps,
  SearchBarFieldState,
  SearchBarValidationState
} from '../../model';
import { useIntl } from 'react-intl';
import validateAddress from '../SearchBar/SearchBarInputValidator';
import './searchbar.scss';
import cx from 'classnames';

const RANGES: Array<number> = [1, 5, 10, 15, 25, 35, 50];

export function SearchBar({ onSubmit }: SearchBarProps) {
  const intl = useIntl();
  const btnSearchLabel = intl.formatMessage({ id: 'SearchBar.button.search.cta' });
  const locationSearchPlaceholder = intl.formatMessage({
    id: 'SearchBar.input.location.placeholder'
  });

  const rangeOptions: RangeList = RANGES.map(value => ({
    value: value,
    label: intl.formatMessage({ id: 'SearchBar.dropdown.range.label' }, { range: value })
  }));

  const DEFAULT_SETTINGS = {
    location: '',
    range: rangeOptions[0]
  };

  const [searchParamsStatus, setSearchParams] = React.useState<SearchBarFieldState>(
    DEFAULT_SETTINGS
  );
  const [{ locationFieldError }, setValidation] = React.useState<SearchBarValidationState>({
    locationFieldError: false
  });

  const updateLocation = (input: string) => {
    setValidation({ locationFieldError: false });
    setSearchParams({
      ...searchParamsStatus,
      location: input
    });
  };

  const updateRange = (rangeInput: RangeOption) =>
    setSearchParams({
      ...searchParamsStatus,
      range: rangeInput
    });

  const showValidationError = () => {
    setValidation({ locationFieldError: true });
    setSearchParams(DEFAULT_SETTINGS);
  };

  const handleSubmit = () =>
    validateAddress(searchParamsStatus.location)
      ? onSubmit(searchParamsStatus.location, searchParamsStatus.range.value)
      : showValidationError();

  return (
    <View vAlignContent="center" basis={300} className="search-bar">
      <Input
        className={cx('form-field', 'location-input', { 'error-focus': locationFieldError })}
        label="Location"
        placeholder={locationSearchPlaceholder}
        value={searchParamsStatus.location}
        onChange={updateLocation}
      />

      <Dropdown
        className="form-field"
        options={rangeOptions}
        value={searchParamsStatus.range}
        onChange={updateRange}
      />

      <Button className="form-field" primary label={btnSearchLabel} onClick={handleSubmit} />
    </View>
  );
}
