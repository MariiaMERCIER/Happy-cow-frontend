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

import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";
import Distance from "../components/Distance";
import SearchBar from "../components/SearchBar";
import FiltreType from "../components/FiltreType";

const ExplorerScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    let arrayRestaurants = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.includes(text)) {
        arrayRestaurants.push(data[i]);
      }
    }
    setSearchResult(arrayRestaurants);
  };

  return isLoading ? (
    <SafeAreaView>
      <Text>En chargement</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <SearchBar searchResult={searchResult} handleSearch={handleSearch} />
      <View style={{ flexDirection: "row" }}>
        <FiltreType />
        <FiltreType />
        <FiltreType />
        <FiltreType />
      </View>

      <FlatList
        data={searchResult}
        keyExtractor={(item) => item.placeId}
        renderItem={({ item }) => {
          console.log(item.type);
          return (
            <TouchableOpacity
              style={{ borderColor: "green", borderWidth: 1 }}
              onPress={() => navigation.navigate("Restaurant")}
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
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExplorerScreen;
