import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
  FlatList,
  TouchableOpacity
} from "react-native";
import {RestaurantInfoCard} from '../components/restaurant-info-card.component';
import {Search} from '../components/search.component';
import { SafeArea } from '../../../components/utility/safe-area.components';
import {FadeInView} from '../../../components/animations/fade.animation';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { FavouritesBar } from '../../../components/favourites/favourites-bar.component';

import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { FavouritesContext } from '../../../services/favourites/favourites.context';

const isAndroid = Platform.OS === "android";
const androidPadding = 3;
const marginTop = isAndroid ? (StatusBar.currentHeight + androidPadding) : 0;

export const RestaurantsScreen = ({navigation}) => {
  
  const [searchQuery, setSearchQuery] = React.useState('');

  //const onChangeSearch = query => setSearchQuery(query);
  
  //Styled components
  const RestaurantList = styled(FlatList)`
    padding: ${(props)  => props.theme.space[3]}
  `;

  const Loading = styled(ActivityIndicator)`
          margin-left: -25px;
  `;
  const LoadingContainer = styled(View)`
      flex: 1;
      position:absolute;
      top:50%;
      left:50%;
  `;
  const {restaurants, isLoading, error} = useContext(RestaurantsContext);
  const {favourites, addToFavourites, removeFromFavourites} = useContext(FavouritesContext);
  const [isToggled,setIsToggled] = useState(false); 

  return (
    <SafeArea>
      
      <LoadingContainer>
         <ActivityIndicator animating={isLoading} color={Colors.red800} size='50'/>
      </LoadingContainer>
      
      <Search
          isFavouritesToggled={isToggled}
          onFavouritesToggle={() => setIsToggled(!isToggled)}/>

      {
        isToggled && 
          <FavouritesBar favourites={favourites} onNavigateToScreen={(screenName, restaurant) => navigation.navigate(screenName,{restaurant:restaurant})}/>
      }
      
      <FlatList
         data= {restaurants}              
         renderItem={( {item} ) => {
          return (
               <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetails",{restaurant:item})}>
                    <FadeInView>
                      <RestaurantInfoCard restaurant={item}/>
                    </FadeInView>
               </TouchableOpacity>
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
