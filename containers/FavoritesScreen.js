import axios from "axios";
import { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GenerateStars from "../components/GenerateStars";
import ColorType from "../components/ColorType";

const FavoritesScreen = ({ userToken }) => {
  const [favoriteData, setFavoriteData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const favoriteInfo = await axios.get("http://localhost:4000/favorites", {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      console.log(favoriteInfo.data);
      setFavoriteData(favoriteInfo.data);
    };
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={favoriteData.favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ borderColor: "green", borderWidth: 1 }}
              onPress={() =>
                navigation.navigate("Restaurant", {
                  id: item.id,
                })
              }
            >
              <Image
                source={{ uri: item.photoFvrt }}
                style={{ width: 50, height: 50 }}
              />

              <Text>{item.name}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </Text>
              <Text>
                <GenerateStars rating={item.rating} />
              </Text>

              <Text
                style={{
                  height: 20,
                  backgroundColor: ColorType[item.kitchenType]
                    ? ColorType[item.kitchenType]
                    : null,
                }}
              >
                {item.kitchenType}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FavoritesScreen;
