import axios from "axios";
import { useEffect, useState } from "react";
import { Text, Image } from "react-native";

const PlusScreen = ({ userId, userToken }) => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const infoUser = await axios.get(`http://localhost:4000/user/${userId}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      setUserData(infoUser.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Text>hello {userData.name}!</Text>
      <Image
        source={userData.photo}
        style={{ width: 30, height: 30, borderRadius: 50 }}
      />
    </>
  );
};

export default PlusScreen;
