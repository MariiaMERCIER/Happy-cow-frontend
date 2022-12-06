import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import axios from "axios";

import Lottie from "../assets/44991-a-fitness-cow.json";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../components/Input";
import MainBtn from "../components/MainBtn";

const ProfileScreen = ({ userToken, handleIdToken, userId }) => {
  const navigation = useNavigation();
  const [pageLoading, setPageLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoUser = await axios.get(
          `http://localhost:4000/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );

        setPageLoading(false);
        setUserImage(infoUser.data.photo);
        setUserName(infoUser.data.name);
        setUserEmail(infoUser.data.email);
      } catch (error) {
        console.log("profileError >>>", error.infoUser.data.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (selectedAvatar) {
      setInfoLoading(true);

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
              authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          alert("Photo registered");
        }
      } catch (error) {
        console.log("catchSendAvatar >>", error.response.data.message);
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
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        setInfoLoading(false);
        alert("Your profile has been successefully modified");
      } catch (error) {
        console.log("updateInfo >>", error.response.data);
      }
    }
  };

  const getPermissionPicture = async () => {
    const hasPermisison = await ImagePicker.requestCameraPermissionsAsync();
    console.log(hasPermisison);
    if (hasPermisison.status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      console.log(result.assets[0].uri);

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
  return pageLoading ? (
    <Text>Is loading</Text>
  ) : (
    // )
    //   <Lottie />
    // ) : (
    <>
      <Image
        source={
          selectedAvatar
            ? { uri: selectedAvatar }
            : userImage
            ? { uri: userImage.secure_url }
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
      <MainBtn
        text="Favorite places"
        setFunction={() => navigation.navigate("Favorites")}
      />
      <MainBtn text="Log out" setFunction={() => handleIdToken(null)} />
    </>
  );
};

export default ProfileScreen;
