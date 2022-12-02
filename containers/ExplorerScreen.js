import { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

import * as Location from "expo-location";

import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";
import Distance from "../components/Distance";
import SearchBar from "../components/SearchBar";
import FiltreType from "../components/FiltreType";

const ExplorerScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [geoPermission, setGeoPermission] = useState(false);
  const [coordsLat, setCoordsLat] = useState();
  const [coordsLong, setCoordsLong] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let getPermission = await Location.requestForegroundPermissionsAsync();
      if ((getPermission.status = "granted")) {
        let getPosition = await Location.getCurrentPositionAsync();

        setCoordsLat(getPosition.coords.latitude);
        setCoordsLong(getPosition.coords.longitude);

        setGeoPermission(true);
      } else {
        setError(error);
      }
    };
    askPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [geoPermission, coordsLat, coordsLong]);

  const handleSearch = (text) => {
    if (text) {
      const research = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.includes(text)) {
          research.push(data[i]);
        }
      }
      setData(research);
    }
  };

  return isLoading ? (
    <SafeAreaView>
      <Text>En chargement</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <SearchBar data={data} handleSearch={handleSearch} />
      <View style={{ flexDirection: "row" }}>
        <FiltreType />
        <FiltreType />
        <FiltreType />
        <FiltreType />
      </View>

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
                coordsLat={coordsLat}
                coordsLong={coordsLong}
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
