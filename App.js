import React, { useState, useEffect} from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as firebase from 'firebase';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { SafeArea } from "./src/components/utility/safe-area.components";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { Navigation } from "./src/infrastructure/navigation";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

var firebaseConfig = {
  apiKey: "AIzaSyC32N-iOV6DLRlEU2FpGGQpy9jWSF3sqcw",
  authDomain: "mealstogo-7fcb0.firebaseapp.com",
  projectId: "mealstogo-7fcb0",
  storageBucket: "mealstogo-7fcb0.appspot.com",
  messagingSenderId: "461055649372",
  appId: "1:461055649372:web:c1c223ec3d3236a58ba899"
};

//if firebase app has not been initialized then initialize it.
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated]  = useState(false);

  //useEffect(() => {
    // setTimeout(() => {//wait 2 seconds for authentication to kick in .
    //   firebase.auth().signInWithEmailAndPassword("walt200065@gmail.com", "Frank#991")
    //     .then((user) => {
    //       console.log('User is',user);
    //       setIsAuthenticated(true)
    //     }).catch((error) => {
    //       console.log('Error is ',error);
    //     });
    //   },2000)
  //},[])

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

 
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
                <Navigation />
        </AuthenticationContextProvider>
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
