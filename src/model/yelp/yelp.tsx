import * as t from 'io-ts';

export const ResturantCoordinates = t.type({
  latitude: t.number,
  longitude: t.number
});

export const Categories = t.array(
  t.type({
    alias: t.string,
    title: t.string
  })
);

export const ResturantLocation = t.type({
  address1: t.string,
  address2: t.string,
  address3: t.string,
  city: t.string,
  country: t.string,
  display_address: t.array(t.string),
  state: t.string,
  zip_code: t.string
});

export const Business = t.type({
  categories: Categories,
  coordinates: ResturantCoordinates,
  display_phone: t.string,
  distance: t.number,
  id: t.string,
  alias: t.string,
  image_url: t.string,
  is_closed: t.boolean,
  location: ResturantLocation,
  name: t.string,
  phone: t.string,
  price: t.string,
  rating: t.number,
  review_count: t.number,
  url: t.string,
  transactions: t.array(t.string)
});

export const YelpAPIResponse = t.partial({
  business: t.array(Business),
  total: t.number
});
export type YelpAPIResponseT =  t.TypeOf<typeof YelpAPIResponse>;

export interface YelpErrorResponse {
  msg: string;
}
