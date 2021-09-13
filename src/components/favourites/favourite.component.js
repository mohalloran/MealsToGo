import React, {useContext } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from "@expo/vector-icons";

import {FavouritesContext} from  '../../services/favourites/favourites.context';

const FavouriteButton = styled(TouchableOpacity)`
     position: absolute;
     top: 25px;
     right: 10px;
     width: 64px;
     z-index: 9;
`;

export const Favourite = ({restaurant}) => {
    const { favourites, addToFavourites, removeFromFavourites} = useContext(FavouritesContext);
    
    const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);

    return (
        <FavouriteButton 
            onPress={() =>
                 !isFavourite ? addToFavourites(restaurant)
                 : removeFromFavourites(restaurant)} >
            <AntDesign
                name={isFavourite ? "heart" : "hearto"}
                size={35}
                color={isFavourite ? "red" : "white"}
            />
        </FavouriteButton>
    )
}