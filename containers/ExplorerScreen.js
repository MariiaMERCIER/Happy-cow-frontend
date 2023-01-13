import { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
import ImageType from "../components/ImageType";
import HeartFvrt from "../components/HeartFvrt";

const ExplorerScreen = ({ userToken, clicked, setClicked }) => {
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
      for (let i = 0; i < listRestaurant.length; i++) {
        if (listRestaurant[i].name.includes(text)) {
          research.push(listRestaurant[i]);
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
    try {
      console.log(
        placeId,
        name,
        description,
        address,
        rating,
        type,
        phone,
        thumbnail
      );
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
    <>
      <SearchBar handleSearch={handleSearch} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ flexDirection: "row" }}
        >
          <FiltreType
            text="See all"
            listRestaurant={listRestaurant}
            setData={setData}
          />
          <FiltreType
            listRestaurant={listRestaurant}
            setData={setData}
            text="Vegan"
            image={require("../assets/category_vegan.png")}
          />
          <FiltreType
            listRestaurant={listRestaurant}
            setData={setData}
            text="Vegetarian"
            image={require("../assets/category_vegetarian.png")}
          />
          <FiltreType
            listRestaurant={listRestaurant}
            setData={setData}
            text="Veg-options"
            image={require("../assets/category_veg-options.png")}
          />
          <FiltreType
            listRestaurant={listRestaurant}
            setData={setData}
            text="Store"
            image={require("../assets/category_health-store.png")}
          />
          <FiltreType
            listRestaurant={listRestaurant}
            setData={setData}
            text="Ice Cream"
            image={require("../assets/category_ice-cream.png")}
          />
          <FiltreType
            listRestaurant={listRestaurant}
            setData={setData}
            text="Other"
            image={require("../assets/category_other.png")}
          />
        </ScrollView>

        <FlatList
          data={data}
          keyExtractor={(item) => item.placeId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("Restaurant", {
                    id: item.placeId,
                  })
                }
              >
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View>
                  <View style={styles.row}>
                    <Text style={styles.title}>{item.name}</Text>

                    <Image
                      source={
                        ImageType[item.type] ? ImageType[item.type] : null
                      }
                      alt="type-restaurant"
                      style={styles.logoType}
                    />
                  </View>

                  <View style={styles.details}>
                    <View style={styles.stars}>
                      <GenerateStars rating={item.rating} />
                    </View>

                    <Distance
                      latitude={item.location.lat}
                      longitude={item.location.lng}
                      coords={coords}
                      geoPermission={geoPermission}
                    />
                  </View>
                  <Text
                    style={styles.text}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>

                  <Text>
                    <GenerateDollar price={item.price} />
                  </Text>
                  <View style={styles.heart}>
                    <HeartFvrt
                      clicked={clicked}
                      setFunction={
                        () => handleFavorite(item)
                        // , setClicked(true)
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default ExplorerScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  card: {
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 180,
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 150,
    marginRight: 15,
    borderRadius: 5,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    width: 200,
  },
  text: {
    fontSize: 14,
    width: 250,
  },

  details: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  row: {
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  logoType: {
    width: 25,
    height: 25,
  },

  stars: {
    flexDirection: "row",
  },

  heart: {
    width: 250,
    alignItems: "flex-end",
  },
});
