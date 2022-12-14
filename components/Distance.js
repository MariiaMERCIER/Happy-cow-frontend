import * as geolib from "geolib";
import getDistance from "geolib/es/getDistance";
import { Text } from "react-native";

const Distance = ({ latitude, longitude, coords, geoPermission }) => {
  let convertDist = "";
  if (geoPermission) {
    const My_coord = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    const Place_coord = { latitude: latitude, longitude: longitude };
    const dist = getDistance(My_coord, Place_coord);
    convertDist = Math.round(geolib.convertDistance(dist, "km") * 100) / 100;
  }

  return <Text>{convertDist} km</Text>;
};

export default Distance;
