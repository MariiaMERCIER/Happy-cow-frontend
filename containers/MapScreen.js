import { useState } from "react";
import axios from "axios";
import { View } from "react-native";
import listRestaurant from "../happy-cow.json";

import { LeafletView } from "react-native-leaflet-view";

const MapScreen = () => {
  let arrayMap = [];

  const marketPosition = () => {
    for (let i = 0; i < listRestaurant.length; i++) {
      arrayMap.push(listRestaurant[i].location);
      arrayMap.push(listRestaurant[i].name);
      // arrayMap.push({ icon: "📍" });
      // arrayMap.push({ size: [60, 60] });
    }
    console.log("ARRAyMAP>>>>>>>>>>>>", arrayMap);
    return arrayMap;
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <LeafletView
        mapCenterPosition={{ lat: 48.856614, lng: 2.3522219 }}
        zoom={13}
        mapMarkers={marketPosition}
      />
    </View>
  );
};
export default MapScreen;
