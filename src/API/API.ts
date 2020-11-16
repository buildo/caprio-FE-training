import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { taskEither, either } from 'fp-ts';
import { TaskEither } from 'fp-ts/TaskEither';
import { failure } from 'io-ts/lib/PathReporter';
import { config } from '../config';
import { YelpAPIErrorResponse, YelpAPIResponse } from '../model/yelp/yelp';

export type ApiError = { type: 'Generic' } | { type: 'Decoding'; description: string };
export type YelpError = { type: 'YelpError'; code: string; description: string };
export type AppErrors = ApiError | YelpError;
export const genericError: ApiError = { type: 'Generic' };

export const PAGE_SIZE_CONFIG = 10;

const PROXY_YELP_API = config.yelp_proxy;
const SEARCH_API_PATH = '/businesses/search'

const requestInit: RequestInit = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${config.yelpApiToken}`
  }
};

const getGenericError = (errors: t.Errors): ApiError => {
  const description = failure(errors).join(' - ');
  return { type: 'Decoding', description: description };
};

const decodingSuccessResponse: (res: unknown) => TaskEither<AppErrors, YelpAPIResponse> = res => {
  return pipe(YelpAPIResponse.decode(res), either.mapLeft(getGenericError), taskEither.fromEither);
};

const decodingYelpError = (errRes: YelpAPIErrorResponse): AppErrors =>
  pipe(
    YelpAPIErrorResponse.decode(errRes),
    either.map(res => ({
      type: 'YelpError' as const,
      code: res.error.code,
      description: res.error.description
    })),
    either.getOrElseW(() => genericError)
  );

export const searchResturant = (params: {
  location: string;
  range: number;
  page: number;
}): TaskEither<AppErrors, YelpAPIResponse> =>
  pipe(
    taskEither.tryCatch(
      () =>
        fetch(UrlBuilder(params), requestInit).then(res =>
          res.json().then(body => ({ status: res.status, body }))
        ),
      () => genericError
    ),
    taskEither.chain(({ status, body }) =>
      status === 200 ? decodingSuccessResponse(body) : taskEither.left(decodingYelpError(body))
    )
  );


function UrlBuilder(params: { location: string; range: number; page: number }): RequestInfo {
  const offsetParam = params.page ? params.page * PAGE_SIZE_CONFIG : 0;
  return `${PROXY_YELP_API}${SEARCH_API_PATH}?term=restaurants&location=${params.location}&radius=${params.range}&offset=${offsetParam}&limit=${PAGE_SIZE_CONFIG}`;
}


