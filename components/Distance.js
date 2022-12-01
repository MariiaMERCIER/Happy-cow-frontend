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

  useEffect(() => {
    const askPermission = async () => {
      let getPermission = await Location.requestForegroundPermissionsAsync();
      if ((getPermission.status = "granted")) {
        let getPosition = await Location.getCurrentPositionAsync();
        setCoordsLatitude(getPosition.coords.latitude);
        setCoordsLongitude(getPosition.coords.longitude);

        setIsLoading(false);
      } else {
        setError(error);
      }
    };
    askPermission();
  }, []);

  let convertDist = "";
  if (!isLoading) {
    const My_coord = {
      latitude: coordsLatitude,
      longitude: coordsLongitude,
    };
    const Place_coord = { latitude: latitude, longitude: longitude };
    const dist = getDistance(My_coord, Place_coord);
    convertDist = Math.round(geolib.convertDistance(dist, "km") * 100) / 100;
  }
  //   const rounded = Math.round(convert * 100) / 100;

  return <Text>{convertDist} km</Text>;
};

export default Distance;
