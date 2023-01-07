import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import Input from "../components/Input";
import MainBtn from "../components/MainBtn";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ handleIdToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eyeclose, setEyeclose] = useState(false);

  const navigation = useNavigation();

  const handleLogIn = async () => {
    setErrorMessage("");
    try {
      if (!email || !password) {
        setErrorMessage("Fill all fields");
      }

      const response = await axios.post("http://localhost:4000/user/login", {
        email: email,
        password: password,
      });

      handleIdToken(response.data.token, response.data.id);

      navigation.navigate("Explorer");
      alert("Glad to see you back :)");
    } catch (error) {
      console.log("logInCatch >>", error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/happyCow.jpeg")}
        alt="logo cow"
        resizeMode="cover"
      />
      <Text style={styles.title}>LOG IN</Text>
      <Input
        type="email"
        value={email}
        placeholder="Email"
        setFunction={(text) => setEmail(text)}
      />
      <View>
        <Input
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry={eyeclose ? null : "secureTextEntry"}
          setFunction={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setEyeclose(!eyeclose)}
        >
          <Ionicons
            name={eyeclose ? "eye" : "eye-off"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <Text>{errorMessage}</Text>
      <MainBtn text="Join us" setFunction={handleLogIn} />
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>You have no account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },

  title: {
    color: "#9069CF",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },

  input: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: 10,
    bottom: 15,
  },
});
