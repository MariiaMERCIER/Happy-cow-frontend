import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BtnRest = ({ name, text }) => {
  return (
    <View style={{ flexDirection: "column", width: 65, alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#eae3f5",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          <MaterialIcons name={name} size={24} color="#9069CD" />
        </Text>
      </TouchableOpacity>

      <Text>{text}</Text>
    </View>
  );
};

export default BtnRest;
