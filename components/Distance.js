import getDistance from "geolib/es/getDistance";
import { Text } from "react-native";

import * as Location from "expo-location";
import { useEffect, useState } from "react";

const Distance = ({ latitude, longitude }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let getPermission = await Location.requestForegroundPermissionsAsync();
      if ((getPermission.status = "granted")) {
        let getPosition = await Location.getCurrentPositionAsync();
        setCoords(getPosition.coords);
        setIsLoading(false);
      }
    };
    askPermission();
  }, []);

  const My_coord = {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
  const Place_coord = { latitude: 48.862881, longitude: 2.351543 };
  let dist = getDistance(My_coord, Place_coord, 1000);
  console.log(dist);

  return <Text>Hello</Text>;
};

export default Distance;
