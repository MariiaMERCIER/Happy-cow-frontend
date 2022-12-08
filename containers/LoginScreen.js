import { Text, TouchableOpacity } from "react-native";
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
    <>
      <Input
        type="email"
        value={email}
        placeholder="Email"
        setFunction={(text) => setEmail(text)}
      />
      <Input
        value={password}
        placeholder="Password"
        secureTextEntry={eyeclose ? null : "secureTextEntry"}
        setFunction={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setEyeclose(!eyeclose)}>
        <Ionicons name={eyeclose ? "eye" : "eye-off"} size={24} color="black" />
      </TouchableOpacity>

      <Text>{errorMessage}</Text>
      <MainBtn text="Join us" setFunction={handleLogIn} />
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>You have no account? Sign Up</Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginScreen;
