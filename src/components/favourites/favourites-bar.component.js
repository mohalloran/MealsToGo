import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";
import { CompactRestaurantInfo } from "../restaurant/compact-restaurant-info.component";
import { Favourite } from './favourite.component';

const FavouritesWrapper = styled.View`
    padding: 10px;
`;

const TextView = styled.Text`
    padding: 10px
`

export const FavouritesBar = ({favourites,onNavigateToScreen}) => {
    if( !favourites.length) {
        return null;
    }
    return (
        <FavouritesWrapper>
            <TextView Variant="caption">Favourites</TextView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    favourites.map((restaurant) => {
                        const key = restaurant.name.split(" ").join("");

                        return (
                            <TouchableOpacity key={key} onPress={() => onNavigateToScreen("RestaurantDetails",restaurant)}
                                style={{height:150,marginBottom:5,marginRight: 10}}>
                                <CompactRestaurantInfo restaurant={restaurant} />
                             
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </FavouritesWrapper>
    );
}