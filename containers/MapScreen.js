import { useState } from "react";
import axios from "axios";
import { TouchableOpacity, View } from "react-native";
import listRestaurant from "../happy-cow.json";

import { LeafletView } from "react-native-leaflet-view";
import { FontAwesome } from "@expo/vector-icons";

const MapScreen = ({ navigation }) => {
  // let arrayMap = [];
  // for (let i = 0; i < listRestaurant.length; i++) {
  //   let obj = {
  //     position: listRestaurant[i].location,
  //     title: listRestaurant[i].name,

  //     icon: "📍",
  //     size: [60, 60],
  //   };
  //   arrayMap.push(obj);
  // }

  let arrayMap = [];
  const position = {};
  const title = "";
  const icon = "";
  const size = "";

  const marketPosition = () => {
    for (let i = 0; i < listRestaurant.length; i++) {
      let restaurant = {};
      restaurant.position = listRestaurant[i].location;
      restaurant.title = listRestaurant[i].name;
      restaurant.icon = "📍";
      restaurant.size = [60, 60];
      arrayMap.push(restaurant);
    }

    return arrayMap;
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <LeafletView
        mapCenterPosition={{ lat: 48.856614, lng: 2.3522219 }}
        zoom={13}
        mapMarkers={marketPosition()}
      />
    </View>
  );
};
export default MapScreen;
