import * as React from 'react';
import View from '../View';
import Image from '../Image/Image';
import { Business } from '../../model/yelp/yelp';
import { FormattedMessage } from 'react-intl';

export const RestaurantCard = (prop: { business: Business }) => (
  <View
    className="resturant-card"
    vAlignContent="center"
    basis={220}
    onClick={() => window.open(prop.business.url, '_blank')}
  >
    <View grow className="resturant-card-content" hAlignContent="center">
      <View className="resturant-photo-frame">
        <Image src={prop.business.image_url} height={180} width={200} quality={90} />
      </View>
      <View column vAlignContent="top" style={{ marginLeft: 20, width: 300 }} grow>
        <h2> {prop.business.name}</h2>
        <b>
          <FormattedMessage id="ResturantCard.telephone" />
        </b>
        <p>{prop.business.phone}</p>
        <b>{prop.business.location.display_address}</b>
      </View>
    </View>
  </View>
);
