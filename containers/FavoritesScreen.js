import { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import GenerateStars from "../components/GenerateStars";
import ColorType from "../components/ImageType";
import { AntDesign } from "@expo/vector-icons";

const FavoritesScreen = ({ userToken }) => {
  const [favoriteData, setFavoriteData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteInfo = await axios.get(
          "http://localhost:4000/favorites",
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );

        setFavoriteData(favoriteInfo.data);
      } catch (error) {
        console.log("favoriteInfoCatch >>>", error.response);
      }
    };
    fetchData();
  }, [favoriteData]);

  const handleDelete = async ({ id }) => {
    try {
      const favoriteUpdate = await axios.put(
        "http://localhost:4000/favorites/delete",
        {
          id: id,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log("favoriteDelete >>>", error.message);
    }
  };

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
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FavoritesScreen;
