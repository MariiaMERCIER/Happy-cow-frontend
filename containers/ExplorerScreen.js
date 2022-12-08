import { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import listRestaurant from "../happy-cow.json";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";
import axios from "axios";

import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";
import Distance from "../components/Distance";
import SearchBar from "../components/SearchBar";
import FiltreType from "../components/FiltreType";
import ColorType from "../components/ColorType";
import HeartFvrt from "../components/HeartFvrt";
import BtnListMap from "../components/BtnListMap";

const ExplorerScreen = ({ userToken }) => {
  const [data, setData] = useState(listRestaurant);
  const [error, setError] = useState();
  const [geoPermission, setGeoPermission] = useState(false);
  const [coords, setCoords] = useState();
  const navigation = useNavigation();

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

  const handleFavorite = async ({
    placeId,
    name,
    description,
    address,
    rating,
    type,
    phone,
    thumbnail,
  }) => {
    console.log("ID>>>", placeId);
    try {
      const sendFavorite = await axios.put(
        "http://localhost:4000/favorites/place",
        {
          id: placeId,
          name: name,
          description: description,
          adress: address,
          rating: rating,
          type: type,
          phone: phone,
          photo: thumbnail,
        },

        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      alert("You have just added your favorite place");
    } catch (error) {
      if (error.response.data === "This place has already been in your list") {
        alert("This place has already been in your list");
      }
      console.log("catchSendFavorite >>>", error.response.data);
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
        <FiltreType
          listRestaurant={listRestaurant}
          data={data}
          setData={setData}
          text="Vegan"
        />
        <FiltreType
          listRestaurant={listRestaurant}
          data={data}
          setData={setData}
          text="Vegetarian"
        />
        <FiltreType
          listRestaurant={listRestaurant}
          data={data}
          setData={setData}
          text="Veg-options"
        />
        <FiltreType
          listRestaurant={listRestaurant}
          data={data}
          setData={setData}
          text="Store"
        />
        <FiltreType
          listRestaurant={listRestaurant}
          data={data}
          setData={setData}
          text="Ice Cream"
        />
        <FiltreType
          listRestaurant={listRestaurant}
          data={data}
          setData={setData}
          texst="Other"
        />
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <BtnListMap text="map" setFunction={() => navigation.navigate("Map")} />
        <BtnListMap text="list" />
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
              <Text
                style={{
                  height: 20,
                  backgroundColor: ColorType[item.type]
                    ? ColorType[item.type]
                    : null,
                }}
              >
                {item.type}
              </Text>
              <Distance
                latitude={item.location.lat}
                longitude={item.location.lng}
                coords={coords}
                geoPermission={geoPermission}
              />

              <HeartFvrt setFunction={() => handleFavorite(item)} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExplorerScreen;
