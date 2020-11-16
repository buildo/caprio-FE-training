import React from 'react';
import View from '../View';
import Divider from '../Diveder/Divider';

import './searchresults.scss';
import { YelpAPIResponse } from '../../model/yelp/yelp';
import { RestaurantCard } from '../ResturantCard/ResturantCard';


export function SearchResults(props: YelpAPIResponse) {
  return (
    <View className="search-results" column hAlignContent="center">
      <View column style={{ paddingLeft: 20 }}>
        {props.businesses.map(business => (
          <View column>
            <RestaurantCard key={business.id} business={business} />
            <Divider />
          </View>
        ))}
      </View>
    </View>
  );
}
