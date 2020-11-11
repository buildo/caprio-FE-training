import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { taskEither, either } from 'fp-ts';
import { failure } from 'io-ts/lib/PathReporter';
import { config } from '../config';
import { YelpAPIResponse, YelpAPIResponseT } from '../model/yelp/yelp';

export type ApiError = { type: 'Generic' } | { type: 'Decoding'; description: string };
export const genericError: ApiError = { type: 'Generic' };

const LOCAL_PROXY_YELP_API = 'http://localhost:3000';
const requestInit: RequestInit = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${config.yelpApiToken}`
  }
};

const decodingResponse: (res: any) => taskEither.TaskEither<ApiError, YelpAPIResponseT> = res =>
  pipe(YelpAPIResponse.decode(res), either.mapLeft(decodingError), taskEither.fromEither);

const decodingError = (errors: t.Errors): ApiError => {
  const description = failure(errors).join(' - ');
  return { type: 'Decoding', description: description };
};

export const searchResturant = (params: {
  location: string;
  range: number;
}): taskEither.TaskEither<ApiError, YelpAPIResponseT> =>
  pipe(
    taskEither.tryCatch(
      () =>
        fetch(
          `${LOCAL_PROXY_YELP_API}/businesses/search?term=restaurants&location=${params.location}&radius=${params.range}&limit=10`,
          requestInit
        ).then(res => res.json()),
      either.toError
    ),
    taskEither.mapLeft(() => genericError),
    taskEither.chain(decodingResponse)
  );
