import * as React from 'react';

import Input from '../SearchInput/SearchInput';
import Button from '../Button/Button';
import Dropdown from '../Dropdown';
import Tooltip from '../TooltipError/ErrorTooltip';
import View from '../View/View';
import { RangeList, RangeOption, SearchBarFieldState, SearchBarValidationState } from '../../model';
import { useIntl } from 'react-intl';
import { validateAddress } from '../SearchBar/SearchBarInputValidator';
import './searchbar.scss';
import cx from 'classnames';

type SearchBarProps = {
  onSubmit: (location: string, range: number) => void;
};

const RANGES: Array<number> = [1000, 5000, 10000, 15000, 25000, 35000, 40000];

export function SearchBar({ onSubmit }: SearchBarProps) {
  const intl = useIntl();
  const searchLabelCta = intl.formatMessage({ id: 'SearchBar.button.search.cta' });
  const locationSearchPlaceholderMsg = intl.formatMessage({
    id: 'SearchBar.input.location.placeholder'
  });
  const validationErrorMsg = intl.formatMessage({
    id: 'SearchBar.input.location.validation.error.invalid'
  });

  const rangeOptions: RangeList = RANGES.map(value => ({
    value: value,
    label: intl.formatMessage({ id: 'SearchBar.dropdown.range.label' }, { range: value/1000 })
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

  const showValidationError = () => setValidation({ locationFieldError: true });

  const handleSubmit = () =>
    validateAddress(searchParamsStatus.location)
      ? onSubmit(searchParamsStatus.location, searchParamsStatus.range.value)
      : showValidationError();

  return (
    <View vAlignContent="center" basis={300} className="search-bar">
      <Tooltip
        size="big"
        className="error-tooltip"
        popover={{
          position: 'bottom',
          anchor: 'center',
          content: validationErrorMsg,
          isOpen: locationFieldError
        }}
      >
        <Input
          className={cx('form-field', 'location-input', { 'error-focus': locationFieldError })}
          label="Location"
          placeholder={locationSearchPlaceholderMsg}
          value={searchParamsStatus.location}
          onChange={updateLocation}
        />
      </Tooltip>

      <Dropdown
        className="form-field"
        options={rangeOptions}
        value={searchParamsStatus.range}
        onChange={updateRange}
      />

      <Button className="form-field" primary label={searchLabelCta} onClick={handleSubmit} />
    </View>
  );
}
