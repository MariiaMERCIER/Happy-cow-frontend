import { Text, Image, TouchableOpacity } from "react-native";

const BtnPlus = ({ text, image }) => {
  return (
    <>
      <Text>Hello {text}!</Text>
      <Image source={image} />
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    </>
  );
};
