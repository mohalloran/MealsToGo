import React, { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

export const RestaurantDetailsScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  //console.log('params are ',props.route.params.restaurant);
  const { restaurant } = route.params;

  // useEffect(() => {
  //   console.log("Item is", restaurant);
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <RestaurantInfoCard restaurant={restaurant} />
      </View>

      <ScrollView >
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Irish Breakfast" />
          <List.Item title="French Breakfast" />
        </List.Accordion>

        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Sheppards Pie" />
          <List.Item title="Baked Lasangne" />
          <List.Item title="French Torrinto" />
        </List.Accordion>

        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Steak and kidney pie" />
          <List.Item title="Pork Chops" />
          <List.Item title="Bacon and cabbage" />
        </List.Accordion>

        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Martini" />
          <List.Item title="Scotch on the rocks" />
          <List.Item title="Kentuck Burbon" />
        </List.Accordion>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        paddingBottom: 30,
        justifyContent: "center"
    }
})
