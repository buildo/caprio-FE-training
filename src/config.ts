import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';

const Config = t.type(
  {
    REACT_APP_TITLE: NonEmptyString
  },
  'Config'
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
      yelpApiToken:
        'FNb9av3yURUIV4MaesYKJuERgYx7RinwDthj4b2MyRqZ4dsAFzS9f6QtvV1Dc4-6vAjOkExMxpJNvL9lp9nRRmLOjeSVfIOzuo7lF1dGCc0jAs9J4bCrWvAtExmrX3Yx'
    })
  )
);
