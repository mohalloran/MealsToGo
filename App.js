import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screens";
import { SafeArea } from "./src/components/utility/safe-area.components";

import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

import { Ionicons, Feather } from "@expo/vector-icons";

//import { restaurantsRequest } from './src/services/restaurants/mock/restaurants.service';

//Tab Navigator
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

function MapScreen() {
  return (
    <SafeArea>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Map Screen!</Text>
      </View>
    </SafeArea>
  );
}

const SettingsScreen = () => {
  return (
    <SafeArea>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    </SafeArea>
  );
};

export default function App() {
  //Load Oswald_400Regular
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  //Load Lato_400Regular
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  //make sure fonts are loaded before using the app
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  //the next code is basically this
  //a function passed a prop of route destructured and then
  //the return returns an object ( means return an object
  // const screenOptions = ({route}) => {
  //   return {

  //   }
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsContextProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
              }}
            >
              <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantsContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  search: {
    padding: 16,
  },
  list: {
    flex: 1,
    backgroundColor: "blue",
  },
});
