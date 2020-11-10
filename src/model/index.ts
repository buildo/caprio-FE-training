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