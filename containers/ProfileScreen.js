import { View, Image } from "react-native";
import MainBtn from "../components/MainBtn";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ userToken, userId }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Image
        source={require("../assets/happyCow.jpeg")}
        style={{ width: 200, height: 200 }}
      />

      <MainBtn
        text="Sign Up"
        setFunction={() => navigation.navigate("SignUp")}
      />
      <MainBtn
        text="Log In "
        setFunction={() => navigation.navigate("LogIn")}
      />
    </View>
  );
};

export default ProfileScreen;
