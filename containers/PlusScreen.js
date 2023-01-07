import axios from "axios";
import { useEffect, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Linking,
} from "react-native";

const PlusScreen = ({ userId, userToken }) => {
  const [userData, setUserData] = useState("");

  if (userToken) {
    useEffect(() => {
      const fetchData = async () => {
        const infoUser = await axios.get(
          `http://localhost:4000/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUserData(infoUser.data);
      };
      fetchData();
    }, []);
  } else null;

  return (
    <>
      <Text style={styles.title}>Hello{userData && userData.name}!</Text>
      <Image
        source={userData.photo}
        style={{ width: 30, height: 30, borderRadius: 50 }}
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.happycow.net/members/benefits")
          }
        >
          <Text style={styles.link}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.happycow.net/about-us")}
        >
          <Text style={styles.link}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.happycow.net/vegan-store")
          }
        >
          <Text style={styles.link}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.logo}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.facebook.com/HappyCow")
              }
            >
              <Image
                style={styles.image}
                source={require("../assets/facebook_logo.png")}
                alt="logo-facebook"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.youtube.com/happycow")
              }
            >
              <Image
                style={styles.image}
                source={require("../assets/youtube.png")}
                alt="logo-youtube"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.instagram.com/happycow/")
              }
            >
              <Image
                style={styles.image}
                source={require("../assets/instagram.png")}
                alt="logo-instagram"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://twitter.com/HappyCow")}
            >
              <Image
                style={styles.image}
                source={require("../assets/twitter.png")}
                alt="logo-twitter"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.pinterest.fr/happycowguide/")
              }
            >
              <Image
                style={styles.image}
                source={require("../assets/pinterest.png")}
                alt="logo-pinterest"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PlusScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 40,
    marginHorizontal: 15,
  },

  link: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9069CD",
    marginBottom: 20,
  },

  logo: {
    flexDirection: "row",
  },

  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
