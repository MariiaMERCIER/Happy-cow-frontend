import { Text, View, TouchableOpacity } from "react-native";

const FavoritesScreen = ({ navigation }) => {
  return (
    <View>
      <Text>I am Favorites Screen</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>I return at Profile screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoritesScreen;
