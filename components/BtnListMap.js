import { TouchableOpacity, Text } from "react-native";

const BtnListMap = ({ text, setFunction }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, borderColor: "red", borderWidth: 2 }}
      onPress={setFunction}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default BtnListMap;
