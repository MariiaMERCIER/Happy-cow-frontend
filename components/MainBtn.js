import { TouchableOpacity, StyleSheet, Text } from "react-native";

const MainBtn = ({ text, setFunction, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={backgroundColor ? styles.btnWhite : styles.btn}
      onPress={setFunction}
    >
      <Text style={backgroundColor ? styles.btnWhiteText : styles.btnText}>
        {text}
      </Text>
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

  btnWhite: {
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#9069CD",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  btnWhiteText: {
    color: "#9069CD",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainBtn;
