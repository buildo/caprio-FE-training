import { HistoryLocation } from 'avenger/lib/browser';

export type CurrentView = 'home' | 'detail';

export function locationToView(location: HistoryLocation): CurrentView {
  switch (location.pathname) {
    default:
      return 'home';
  }
}

export function viewToLocation(view: CurrentView): HistoryLocation {
  switch (view) {
    default:
      return { pathname: '/', search: {} };
  }
}

export type RangeOption = {
  value: number;
  label: string;
};

export type RangeList = Array<RangeOption>;

export type SearchBarState = {
  location: string;
  range: RangeOption;
};

export type SearchBarProps = {
  onSubmit: () => any;
};
