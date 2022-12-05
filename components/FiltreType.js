import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";

const FiltreType = ({ link, text, data, setData, listRestaurant }) => {
  let filtre = [];
  const handleFiltre = () => {
    setData(listRestaurant);
    for (let i = 0; i < data.length; i++) {
      if (data[i].type.toLowerCase().includes(text.toLowerCase())) {
        filtre.push(data[i]);
      }
      setData(filtre);
    }
  };
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
