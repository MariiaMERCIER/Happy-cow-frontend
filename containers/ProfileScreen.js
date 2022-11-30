import { Text, View, TouchableOpacity } from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>I am Profile Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <Text>I go to Favorites screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>I go to SignUp screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text>I go to LogIn screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
