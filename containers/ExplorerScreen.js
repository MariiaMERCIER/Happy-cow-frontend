import { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import listRestaurant from "../happy-cow.json";

import * as Location from "expo-location";

import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";
import Distance from "../components/Distance";
import SearchBar from "../components/SearchBar";
import FiltreType from "../components/FiltreType";

const ExplorerScreen = ({ navigation }) => {
  const [data, setData] = useState(listRestaurant);
  const [error, setError] = useState();
  const [geoPermission, setGeoPermission] = useState(false);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let getPermission = await Location.requestForegroundPermissionsAsync();
      if ((getPermission.status = "granted")) {
        let getPosition = await Location.getCurrentPositionAsync();

        setCoords(getPosition.coords);
        setGeoPermission(true);
      } else {
        setError(error);
      }
    };
    askPermission();
  }, []);

  const handleSearch = (text) => {
    const research = [];
    if (text.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.includes(text)) {
          research.push(data[i]);
        }
      }
      setData(research);
    } else {
      setData(listRestaurant);
    }
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
      <SearchBar handleSearch={handleSearch} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{ flexDirection: "row" }}
      >
        <FiltreType text="Vegan" />
        <FiltreType text="Vegatarian" />
        <FiltreType text="Veg-options" />
        <FiltreType text="Stores" />
        <FiltreType text="Ice Cream" />
        <FiltreType texst="Other" />
      </ScrollView>

      <FlatList
        data={data}
        keyExtractor={(item) => item.placeId}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ borderColor: "green", borderWidth: 1 }}
              onPress={() =>
                navigation.navigate("Restaurant", {
                  id: item.placeId,
                  data: data,
                })
              }
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 50, height: 50 }}
              />

              <Text>{item.name}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </Text>
              <Text>
                <GenerateStars rating={item.rating} />
              </Text>
              <Text>
                <GenerateDollar price={item.price} />
              </Text>
              <Distance
                latitude={item.location.lat}
                longitude={item.location.lng}
                coords={coords}
                geoPermission={geoPermission}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExplorerScreen;
