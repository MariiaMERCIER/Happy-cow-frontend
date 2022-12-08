import { Text, Image, TouchableOpacity } from "react-native";

const BtnPlus = ({ text }) => {
  return (
    <>
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    </>
  );
};
export default BtnPlus;
