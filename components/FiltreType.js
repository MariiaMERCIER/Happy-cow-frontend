import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";

const FiltreType = ({ link, text, setData, listRestaurant }) => {
  let filtre = [];
  const handleFiltre = () => {
    setData(listRestaurant);

    if (text === "See all") {
      setData(listRestaurant);
    } else {
      for (let i = 0; i < listRestaurant.length; i++) {
        if (listRestaurant[i].type.toLowerCase().includes(text.toLowerCase())) {
          filtre.push(listRestaurant[i]);
        }
        setData(filtre);
      }
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
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 10,

    marginLeft: 5,
    marginBottom: 15,
    backgroundColor: "#e8e8e8",
  },

  image: {
    width: 10,
    height: 10,
  },
});

export default FiltreType;
