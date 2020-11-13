import * as t from 'io-ts';

export const ResturantLocation = t.type({
  city: t.string,
  display_address: t.array(t.string)
});

export const Business = t.type({
  location: ResturantLocation,
  display_phone: t.string,
  distance: t.number,
  id: t.string,
  image_url: t.string,
  is_closed: t.boolean,
  name: t.string,
  phone: t.string,
  url: t.string
});

export const YelpAPIResponse = t.type({
  businesses: t.array(Business),
  total: t.number
});

export const ErrMsg = t.type({
  code: t.string,
  description: t.string
});

export const YelpAPIErrorResponse = t.type({
  error: ErrMsg
});

export type YelpAPIResponse = t.TypeOf<typeof YelpAPIResponse>;
export type YelpAPIErrorResponse = t.TypeOf<typeof YelpAPIErrorResponse>;
export type Business = t.TypeOf<typeof Business>;