import * as geolib from "geolib";

import getDistance from "geolib/es/getDistance";
import { Text } from "react-native";

import * as Location from "expo-location";
import { useEffect, useState } from "react";

const Distance = ({ latitude, longitude }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coordsLatitude, setCoordsLatitude] = useState();
  const [coordsLongitude, setCoordsLongitude] = useState();
  const [distance, setDistance] = useState();

  useEffect(() => {
    const askPermission = async () => {
      let getPermission = await Location.requestForegroundPermissionsAsync();
      if ((getPermission.status = "granted")) {
        let getPosition = await Location.getCurrentPositionAsync();
        setCoordsLatitude(getPosition.coords.latitude);
        setCoordsLongitude(getPosition.coords.longitude);

        setIsLoading(false);
      }
    };
    askPermission();
  }, []);

  let convert = "";
  if (!isLoading) {
    const My_coord = {
      latitude: coordsLatitude,
      longitude: coordsLongitude,
    };
    const Place_coord = { latitude: latitude, longitude: longitude };
    const dist = getDistance(My_coord, Place_coord);
    convert = geolib.convertDistance(dist, "km");
  }

  return <Text>{convert.toFixed(2)} km</Text>;
};

export default Distance;
