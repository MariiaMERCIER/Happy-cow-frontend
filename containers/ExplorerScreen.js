import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const ExplorerScreen = ({ navigation }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
      );

      setData(response.data);
      // console.log(Object.keys(test[0]));
    };
    fetchData();
  }, []);

  const starRating = (rating) => {
    const starArray = [];
    console.log(Number.isInteger(rating));
    if (Number.isInteger(rating)) {
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          starArray.push(
            <AntDesign name="star" size={24} color="rgb(255, 176, 0)" key={i} />
          );
        } else {
          starArray.push(
            <AntDesign name="star" size={24} color="grey" key={i} />
          );
        }
      }
    } else {
      const roundData = Math.floor(rating);
      // console.log(roundData);
      for (let j = 0; j < 4; j++) {
        if (j > roundData) {
          starArray.push(
            <AntDesign name="star" size={24} color="grey" key={j} />
          );
        } else {
          starArray.push(
            <AntDesign name="star" size={24} color="rgb(255, 176, 0)" key={j} />
          );
        }
      }
      starArray.push(
        <FontAwesome
          name="star-half-empty"
          size={24}
          color="rgb(255, 176, 0)"
        />
      );
    }

    return starArray;
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.placeId)}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </Text>
              <Text>{starRating(item.rating)}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExplorerScreen;
