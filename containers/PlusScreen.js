import axios from "axios";
import { useEffect } from "react";
import { Text, Image } from "react-native";

const PlusScreen = ({ userId, userToken }) => {
  useEffect(() => {
    const fetchData = async () => {
      const infoUser = await axios.get(`http://localhost:4000/user/${userId}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
    };
  });

  return (
    <>
      <Text>hello </Text>
      <Image></Image>
    </>
  );
};

export default PlusScreen;
