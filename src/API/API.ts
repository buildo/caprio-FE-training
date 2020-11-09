import { pipe } from "fp-ts/lib/pipeable";
import { taskEither, either } from "fp-ts";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";

export type ApiError =
  | { type: "Generic" }
  | { type: "Decoding"; description: string };
export const genericError: ApiError = { type: "Generic" };
export const decodingError = (errors: t.Errors): ApiError => {
  const description = failure(errors).join(" - ");
  return { type: "Decoding", description: description };
};

export const searchResturant = (
  locationParam: string
): taskEither.TaskEither<ApiError, string[]> =>
  pipe(
    taskEither.tryCatch(
      () =>
        fetch(
          `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${locationParam}`
        ).then((res) => res.json()),
      either.toError
    ),
    taskEither.mapLeft(() => genericError),
    taskEither.chain((res) =>
      pipe(
        t.array(t.string).decode(res),
        either.mapLeft(decodingError),
        taskEither.fromEither
      )
    )
  );
