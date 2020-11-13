import { queryStrict, available } from 'avenger';
import { getCurrentView } from 'avenger/lib/browser';
import * as API from '../API';
import { locationToView } from '../model';

export const currentView = getCurrentView(locationToView);

export const searchResturantQuery = queryStrict(API.searchResturant, available);
