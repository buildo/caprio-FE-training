import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';

const Config = t.type(
  {
    REACT_APP_TITLE: NonEmptyString,
    REACT_APP_YELP_API_TOKEN: NonEmptyString
  },
  'Env-Config'
);

export const config = pipe(
  process.env,
  Config.decode,
  fold(
    errors => {
      throw new Error(['Invalid config provided:', failure(errors)].join('\n'));
    },
    env => ({
      title: env.REACT_APP_TITLE,
      yelpApiToken: env.REACT_APP_YELP_API_TOKEN
    })
  )
);
