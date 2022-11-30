import { Text, TouchableOpacity, View } from "react-native";

const RestaurantScreen = ({ navigation }) => {
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
