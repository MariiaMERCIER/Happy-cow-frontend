import { TouchableOpacity, StyleSheet, Text } from "react-native";

const MainBtn = ({ text, setFunction }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={setFunction}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#9069CD",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainBtn;
