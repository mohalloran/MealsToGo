import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
  FlatList
} from "react-native";
import {Searchbar} from 'react-native-paper';
import {RestaurantInfoCard} from '../components/restaurant-info-card.component';
import { SafeArea } from '../../../components/utility/safe-area.components';
import { Spacer } from '../../../components/spacer/spacer.component';

import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';

const isAndroid = Platform.OS === "android";
const androidPadding = 3;
const marginTop = isAndroid ? (StatusBar.currentHeight + androidPadding) : 0;

export const RestaurantsScreen = () => {
  
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  
  //Styled components
  const SearchContainer = styled(View)`
    padding: ${(props)  => props.theme.space[3]}
  `;

  //Styled components
  const RestaurantList = styled(FlatList)`
    padding: ${(props)  => props.theme.space[3]}
  `;

  //const restaurantContext = useContext(RestaurantsContext);
  const {restaurants, isLoading, error} = useContext(RestaurantsContext);

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      <FlatList
         data= {restaurants}              
         renderItem={( {item} ) => {
           //console.log('Item is:',item);
           return (
             
                <RestaurantInfoCard restaurant={item}/>
             
           )
         }}
         keyExtractor={ (item) => item.name}
         contentContainerStyle={{padding: 16}}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isAndroid ? StatusBar.currentHeight + androidPadding : 0,
  },
  search: {
    padding: 16,
  },
  list: {
    flex: 1,
    backgroundColor: "blue",
  },
});
