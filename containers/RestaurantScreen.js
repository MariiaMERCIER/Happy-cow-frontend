import {
  Text,
  Linking,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Swiper from "react-native-swiper";
import { LeafletView } from "react-native-leaflet-view";

import BtnRest from "../components/BtnRest";
import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";

const RestaurantScreen = ({ route }) => {
  const id = route.params.id;
  const data = route.params.data;
  const restInfo = data.find((restaurant) => {
    return restaurant.placeId === id;
  });

  console.log(restInfo.address);
  return (
    <>
      <View style={{ width: Dimensions.get("window").width, height: 200 }}>
        <Swiper showsButtons={true} showsPagination={false}>
          {restInfo.pictures.map((picture, index) => (
            <Image
              key={index}
              source={{ uri: picture }}
              style={{ width: Dimensions.get("window").width, height: 200 }}
              resizeMode="cover"
            />
          ))}
        </Swiper>
      </View>
      <Text>{restInfo.name}</Text>
      {restInfo.rating && (
        <Text>
          <GenerateStars rating={restInfo.rating} />
        </Text>
      )}
      <Text>
        <GenerateDollar price={restInfo.price} />
      </Text>
      <Text>{restInfo.description}</Text>
      <View style={{ flexDirection: "row" }}>
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
      <Text>{restInfo.address}</Text>
      {restInfo.phone && <Text>Appeler {restInfo.phone}</Text>}
      {restInfo.link && (
        <TouchableOpacity onPress={() => Linking.openURL(restInfo.link)}>
          <Text>Site web</Text>
        </TouchableOpacity>
      )}
      {restInfo.facebook && (
        <TouchableOpacity onPress={() => Linking.openURL(restInfo.facebook)}>
          <Text>Facebook </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default RestaurantScreen;
