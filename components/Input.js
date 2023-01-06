import { TextInput, StyleSheet } from "react-native";

const Input = ({ value, setFunction, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      autoCapitalize="none"
      style={styles.input}
      value={value}
      secureTextEntry={secureTextEntry ? true : false}
      placeholder={placeholder}
      onChangeText={setFunction}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#9069CD",
  },
});

export default Input;
