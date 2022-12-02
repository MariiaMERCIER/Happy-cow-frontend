import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";
import Distance from "./Distance";

const FiltreType = ({ link, text, handleFiltre }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleFiltre}>
      <Image source={link} style={styles.image} />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: (Dimensions.get("window").width - 30) / 4,
    height: 100,
    borderColor: "orange",
    borderWidth: 2,
    flexShrink: "auto",
  },

  image: {
    width: 10,
    height: 10,
  },
});

export default FiltreType;
