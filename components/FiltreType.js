import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";

const FiltreType = ({ image, text, setData, listRestaurant }) => {
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
      {image ? <Image source={image} style={styles.image} alt="logo" /> : null}

      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginLeft: 10,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#e8e8eF",
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    marginHorizontal: 15,
    width: 25,
    height: 25,
  },
});

export default FiltreType;
