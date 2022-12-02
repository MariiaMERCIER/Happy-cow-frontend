import { Text, Image, View, Dimensions } from "react-native";
// import MapView, { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import { LatLng, LeafletView } from "react-native-leaflet-view";

import BtnRest from "../components/BtnRest";
import GenerateStars from "../components/GenerateStars";
import GenerateDollar from "../components/GenerateDollar";

const RestaurantScreen = ({ route }) => {
  const id = route.params.id;
  const data = route.params.data;
  const restInfo = data.find((element) => {
    return element.placeId === id;
  });

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
      <View>
        <LeafletView

        // mapCenterPosition={{
        //   lat: route.params.latitude,
        //   lng: route.params.longitude,
        // }}
        // ownPositionMarker={{
        //   id: "1",
        //   coords: { lat: route.params.latitude, lng: route.params.longitude },
        //   icon: "❤️",
        //   size: [24, 24],
        //   // animation: {
        //   //   name: AnimationType.BOUNCE,
        //   //   duration: ".5",
        //   //   delay: 0,
        //   //   interationCount: INFINITE_ANIMATION_ITERATIONS,
        //   // },
        // }}
        />
      </View>

      {/* <MapView
        style={{ width: "100%", height: 250 }}
        initialRegion={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          longitudeDelta: 0.2,
          latitudeDelta: 0.2,
        }}
      ></MapView> */}
    </>
  );
};

export default RestaurantScreen;
