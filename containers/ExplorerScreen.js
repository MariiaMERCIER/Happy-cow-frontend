import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import axios from "axios";

import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";
import Distance from "../components/Distance";

const ExplorerScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <SafeAreaView>
      <Text>En chargement</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.placeId}
        renderItem={({ item }) => {
          return (
            <View>
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
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExplorerScreen;
