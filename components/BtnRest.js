import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BtnRest = ({ name, text }) => {
  return (
    <View style={styles.button}>
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

      <Text style={styles.text} t>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    width: 100,
    alignItems: "center",
  },
  text: {
    marginVertical: 5,
  },
});

export default BtnRest;
