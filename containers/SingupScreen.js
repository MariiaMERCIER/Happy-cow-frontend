import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";

import MainBtn from "../components/MainBtn";
import Input from "../components/Input";

const SignupScreen = ({ handleIdToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eyeclose1, setEyeclose1] = useState(false);
  const [eyeclose2, setEyeclose2] = useState(false);

  const navigation = useNavigation();

  const handleSingUp = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    try {
      if (!name || !email || !password || !confirmpass) {
        setErrorMessage("Fill all fields");
      }
      if (password !== confirmpass) {
        setErrorMessage("Passwords are not the same");
      } else {
        const response = await axios.post("http://localhost:4000/user/signup", {
          name: name,
          email: email,
          password: password,
        });

        handleIdToken(response.data.token, response.data.id);

        alert("Congratulation! You have just joined us :)");

        navigation.navigate("Explorer");
      }
    } catch (error) {
      const messageError = error.response.data.message;

      if (messageError === "This mail has alredy been used") {
        setErrorMessage("This mail has alredy been used");
      }
      console.log("signUpCatch >>", error.response.data.message);
    }
  };
  return (
    <>
      <Text>{errorMessage}</Text>
      <Input
        value={name}
        placeholder="Name"
        setFunction={(text) => setName(text)}
      />
      <Input
        value={email}
        placeholder="Email"
        setFunction={(text) => setEmail(text)}
      />
      <Input
        value={password}
        placeholder="Password"
        secureTextEntry={eyeclose1 ? null : "secureTextEntry"}
        setFunction={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setEyeclose1(!eyeclose1)}>
        <Ionicons
          name={eyeclose1 ? "eye" : "eye-off"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Input
        value={confirmpass}
        placeholder="Confirm password"
        secureTextEntry={eyeclose2 ? null : "secureTextEntry"}
        setFunction={(text) => setConfirmpass(text)}
      />
      <TouchableOpacity onPress={() => setEyeclose2(!eyeclose2)}>
        <Ionicons
          name={eyeclose2 ? "eye" : "eye-off"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <MainBtn text="Join us" setFunction={handleSingUp} />
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text>You have already an accout? Log in</Text>
      </TouchableOpacity>
    </>
  );
};

export default SignupScreen;
