import { TouchableOpacity, StyleSheet, Image } from "react-native";

const FiltreType = ({ link }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={link} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "25%",
    height: 80,
    backgroundColor: "lightgreen",
  },

  image: {
    width: 10,
    height: 10,
  },
});

export default FiltreType;
