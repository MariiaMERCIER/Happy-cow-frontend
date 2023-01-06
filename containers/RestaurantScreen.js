import {
  Text,
  Linking,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Swiper from "react-native-swiper";
import { LeafletView } from "react-native-leaflet-view";
import axios from "axios";

import listRestaurant from "../happy-cow.json";

import BtnRest from "../components/BtnRest";
import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";
import HeartFvrt from "../components/HeartFvrt";

import { useRoute } from "@react-navigation/native";

const RestaurantScreen = ({ clicked, setClicked, userToken }) => {
  const [data, setData] = useState(listRestaurant);

  const route = useRoute();
  const id = Number(route.params.id);

  const restInfo = data.find((restaurant) => {
    return restaurant.placeId === id;
  });

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
      console.log("catchSendFavorite >>>", error.message);
    }
  };

  return (
    <>
      <View style={styles.photo}>
        <Swiper showsButtons={true} showsPagination={false}>
          {restInfo.pictures.map((picture, index) => (
            <Image
              key={index}
              source={{ uri: picture }}
              style={styles.photo}
              resizeMode="cover"
            />
          ))}
        </Swiper>
      </View>
      <View>
        <Text style={styles.title}>{restInfo.name}</Text>
        <View style={styles.text}>
          {restInfo.rating && (
            <Text>
              <GenerateStars rating={restInfo.rating} />{" "}
            </Text>
          )}
          <HeartFvrt
            clicked={clicked}
            setFunction={(() => handleFavorite(restInfo), setClicked(true))}
          />
        </View>

        <ScrollView>
          <Text style={styles.description}>{restInfo.description}</Text>
          <View style={styles.buttons}>
            <BtnRest name="add-a-photo" text="Join a photo" />
            <BtnRest name="link" text="Website" />
            <BtnRest name="create" text="Your view" />
            <BtnRest name="share" text="Share" />
          </View>
          <View style={{ width: "100%", height: 200 }}>
            <LeafletView
              mapCenterPosition={{ lat: 48.856614, lng: 2.3522219 }}
              zoom={13}
              mapMarkers={[
                {
                  position: {
                    lat: restInfo.location.lat,
                    lng: restInfo.location.lng,
                  },
                  title: restInfo.name,
                  icon: "📍",
                  size: [40, 40],
                },
              ]}
            ></LeafletView>
          </View>
          <View>
            <View style={styles.contact}>
              <Image
                source={require("../assets/map-icon.png")}
                alt="localisation"
                style={styles.icon}
              />
              <Text>{restInfo.address}</Text>
            </View>
            <View style={styles.contact}>
              <Image
                source={require("../assets/telephone.png")}
                alt="icon-telephone"
                style={styles.icon}
              />
              {restInfo.phone && <Text>{restInfo.phone}</Text>}
            </View>
            {restInfo.link && (
              <View style={styles.contact}>
                <Image
                  source={require("../assets/globe.png")}
                  alt="globe"
                  style={styles.icon}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(restInfo.link)}
                >
                  <Text>Site web</Text>
                </TouchableOpacity>
              </View>
            )}

            {restInfo.facebook && (
              <View style={styles.contact}>
                <Image
                  source={require("../assets/facebook.png")}
                  alt="logo-fb"
                  style={styles.icon}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(restInfo.facebook)}
                >
                  <Text>Facebook </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#1FAD9E",
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "white",
  },

  text: {
    backgroundColor: "#1FAD9E",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,

    paddingBottom: 10,
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    paddingHorizontal: 10,
    lineHeight: 18,
    marginBottom: 15,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  photo: { width: Dimensions.get("window").width, height: 200 },

  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  contact: {
    paddingHorizontal: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default RestaurantScreen;
