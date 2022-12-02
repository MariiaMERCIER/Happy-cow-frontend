import { Text, TouchableOpacity, View } from "react-native";

const RestaurantScreen = ({ route }) => {
  const id = route.params.id;
  const data = route.params.data;
  const found = data.find((element) => {
    return element.placeId === id;
  });
  console.log(found);

  return (
    <View>
      <Text>I am Restaurant Screen</Text>
    </View>
  );
};

export default RestaurantScreen;
