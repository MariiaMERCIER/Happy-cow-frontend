import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import Input from "../components/Input";
import MainBtn from "../components/MainBtn";
import axios from "axios";

const ProfileScreen = ({
  userToken,
  handleIdToken,
  userName,
  userEmail,
  setUserName,
  setUserEmail,
}) => {
  const navigation = useNavigation();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleUpdate = async () => {
    if (selectedAvatar) {
      setImageLoading(true);

      const tab = selectedAvatar.split(".");
      try {
        const formData = new FormData();
        formData.append("image", {
          uri: selectedAvatar,
          name: `my-avatar.${tab[1]}`,
          type: `image/${tab[1]}`,
        });

        const response = await axios.put(
          "http://localhost:4000/user/update",
          formData,

          {
            headers: {
              authorization: "Bearer " + userToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          setImageLoading(false);
          alert("Photo registered");
          console.log(response.data);
        }
      } catch (error) {
        console.log("catchSendImage >>", error.response.data.error.message);
      }
    }
    if (userName || userEmail) {
      try {
        const updateInformation = await axios.put(
          "http://localhost:4000/user/update",
          {
            name: userName,
            email: userEmail,
          },
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        );
        alert("Your profile has been successefully modified");
      } catch (error) {
        console.log("updateInfo >>", error.response);
      }
    }
  };

  const getPermissionPicture = async () => {
    const hasPermisison = await ImagePicker.requestCameraPermissionsAsync();

    if (hasPermisison.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("No photo selected");
      } else {
        setSelectedAvatar(result.assets[0].uri);
      }
    } else {
      alert("Permission refused ");
    }
  };

  const getPermissionPhoto = async () => {
    const hasPermisison = await ImagePicker.requestCameraPermissionsAsync();

    if (hasPermisison.status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      setSelectedAvatar(result.assets[0].uri);
    } else {
      alert("Permission refused ");
    }
  };

  return !userToken ? (
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
  ) : (
    <>
      <Image
        source={
          selectedAvatar
            ? { uri: selectedAvatar }
            : require("../assets/happyCow.jpeg")
        }
        style={{ width: 200, height: 200 }}
      />

      <MaterialIcons
        name="photo-library"
        size={24}
        color="black"
        onPress={getPermissionPicture}
      />
      <MaterialIcons
        name="add-a-photo"
        size={24}
        color="black"
        onPress={getPermissionPhoto}
      />
      <Input value={userName} setFunction={(text) => setUserName(text)} />
      <Input value={userEmail} setFunction={(text) => setUserEmail(text)} />
      <MainBtn
        backgroundColor={true}
        text="Update My profile"
        setFunction={handleUpdate}
      />
      <MainBtn text="Favorite places" />
      <MainBtn text="Log out" setFunction={() => handleIdToken(null)} />
    </>
  );
};

export default ProfileScreen;
