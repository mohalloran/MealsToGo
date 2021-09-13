import React from "react";
import { Text } from "react-native";

import {RestaurantsScreen} from '../../features/restaurants/screens/restaurants.screens';
import { RestaurantDetailsScreen} from '../../features/restaurants/screens/restaurant.details.screen';
//TransationPresets set transition for the screen
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = ()  => {
    //stack navigator allows us to stack screens and with 
    //a click we can change the screen that is diplayed .
    return (
        <RestaurantStack.Navigator
            headerMode="none"
            screenOptions={{...TransitionPresets.ModalPresentationIOS}}  >
            <RestaurantStack.Screen
                name="Restaurants"
                component={RestaurantsScreen}
               
            />

            <RestaurantStack.Screen
                name="RestaurantDetails"
                component={RestaurantDetailsScreen}
                headerMode="non"/>
        </RestaurantStack.Navigator>
    )
}

