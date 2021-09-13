import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { restaurantsRequest } from "../../../services/restaurants/restaurants.service";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({navigation}) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {

    const northeastLat = viewport.northeast.lat;
    const northwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - northwestLat);


  },[location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: latDelta,
            longitudeDelta: 0.02
        }}
      >
        {restaurants.map((restaurant) => {
          return <MapView.Marker 
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                longitude: restaurant.geometry.location.lng,
                latitude: restaurant.geometry.location.lat
              }}
          >
              <MapView.Callout onPress={() => navigation.navigate("RestaurantDetails",{restaurant:restaurant})}>
                  <MapCallout restaurant={restaurant}/>
              </MapView.Callout>
          
          </MapView.Marker>;
        })}
      </Map>
    </>
  );
};
