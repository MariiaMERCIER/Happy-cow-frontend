import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HeartFvrt = ({ setFunction }) => {
  return (
    <TouchableOpacity onPress={setFunction}>
      <Text>
        <AntDesign name="hearto" size={24} color="black" />
      </Text>
    </TouchableOpacity>
  );
};

export default HeartFvrt;
