import React, {useContext} from 'react';
import { Text, Button ,View, StyleSheet } from "react-native";

//Context providers
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

import { Ionicons, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: "md-restaurant",
    Map: "md-map",
    Settings: "md-settings",
};
  
  //jsx currying calls the function tabBarIcon with a parm iconName returns
  //a function which is called with two parameters size and color
  const tabBarIcon = (iconName) => ({ size, color }) => {
    return <Ionicons name={iconName} size={size} color={color} />;
  };

//screenOptions passed props and we extract route from it destructure
//tabBarIcon function called internally with size and color
const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
      tabBarIcon: tabBarIcon(iconName),
      // tabBarIcon: ({size, color}) => (
      //    <Ionicons name={iconName} size={size} color={color} />
      // )
    };
};

export const AppNavigator = () => (
  //moved Providers from App.js so that when we change user we unmount the context and load again.
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>

        <NavigationContainer>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
          </Tab.Navigator>
        </NavigationContainer>

      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
