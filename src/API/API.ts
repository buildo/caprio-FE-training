import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { taskEither, either } from 'fp-ts';
import { TaskEither } from 'fp-ts/TaskEither';
import { failure } from 'io-ts/lib/PathReporter';
import { config } from '../config';
import {
  YelpAPIErrorResponse,
  YelpAPIErrorResponseT,
  YelpAPIResponse,
  YelpAPIResponseT
} from '../model/yelp/yelp';

export type ApiError = { type: 'Generic' } | { type: 'Decoding'; description: string };
export type YelpError = { type: 'YelpError'; code: string; description: string };
export type AppErrors = ApiError | YelpError;
export const genericError: ApiError = { type: 'Generic' };

const PROXY_YELP_API = config.yelp_proxy;
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

const decodingSuccessResponse: (res: unknown) => TaskEither<AppErrors, YelpAPIResponseT> = res => {
  return pipe(YelpAPIResponse.decode(res), either.mapLeft(getGenericError), taskEither.fromEither);
};

const decodingYelpError = (errRes: YelpAPIErrorResponseT): AppErrors =>
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
}): TaskEither<AppErrors, YelpAPIResponseT> =>
  pipe(
    taskEither.tryCatch(
      () =>
        fetch(
          `${PROXY_YELP_API}/businesses/search?term=restaurants&location=${params.location}&radius=${params.range}&limit=10`,
          requestInit
        ).then(res => res.json().then(body => ({ status: res.status, body }))),
      () => genericError
    ),
    taskEither.chain(({ status, body }) =>
      status === 200 ? decodingSuccessResponse(body) : taskEither.left(decodingYelpError(body))
    )
  );
