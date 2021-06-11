import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import React from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const androidPadding = 3;

export default function App() {
  return (
    <>
    <SafeAreaView style={styles.container}>
       <View style={styles.search} >
         <Text>Search</Text></View>
       <View style={styles.list}></View>
    </SafeAreaView>
    <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isAndroid ? StatusBar.currentHeight+androidPadding : 0
  },
  search: {
    padding: 16,
    backgroundColor: 'green',

  },
  list: {
    flex: 1,
    backgroundColor: 'blue',
  }

});
