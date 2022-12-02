import { TextInput } from "react-native";

const SearchBar = ({ handleSearch }) => {
  return (
    <TextInput
      style={{ height: 40, width: "80%" }}
      placeholder="Type Here..."
      onChangeText={handleSearch}
    />
  );
};

export default SearchBar;
