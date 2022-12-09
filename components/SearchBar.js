import { TextInput, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ handleSearch }) => {
  return (
    <View style={styles.constainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={(text) => handleSearch(text)}
      />
      <Feather style={styles.icon} name="search" size={24} color="grey" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#9069CD",
    // alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    height: 40,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  icon: {
    position: "absolute",
    marginHorizontal: 15,
  },
});
