import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HeartFvrt = ({ setFunction, clicked }) => {
  return (
    <TouchableOpacity onPress={setFunction}>
      <Text>
        <AntDesign name="hearto" size={24} color={clicked ? "red" : "black"} />
      </Text>
    </TouchableOpacity>
  );
};

export default HeartFvrt;
