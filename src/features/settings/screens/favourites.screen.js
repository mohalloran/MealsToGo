import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

import {FavouritesContext} from '../../../services/favourites/favourites.context'

import {SafeArea} from '../../../components/utility/safe-area.components';
import {Text} from '../../../components/typography/text.component';
import { Spacer } from "../../../components/spacer/spacer.component";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = () => {

    const {favourites} = useContext(FavouritesContext);
    
    return favourites.length ? (
        <SafeArea>
          <RestaurantList
            data={favourites}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: item,
                    })
                  }
                >
                  <Spacer position="bottom" size="large"/>
                  <RestaurantInfoCard restaurant={item} />
                  
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.name}
          />
        </SafeArea>
      ) : (
        <NoFavouritesArea>
          <Text center>No favourites yet</Text>
        </NoFavouritesArea>
      );

}