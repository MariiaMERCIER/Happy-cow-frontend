import { Text, TouchableOpacity, View } from "react-native";

const RestaurantScreen = ({ navigation, data, placeId }) => {
  console.log(placeId, data);
  const found = data.find((element) => {
    return element.placeId === placeId;
  });
  console.log(found);

  return (
    <View>
      <Text>I am Restaurant Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>I return at Explorer screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantScreen;
