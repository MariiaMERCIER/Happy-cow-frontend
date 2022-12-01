import { Foundation } from "@expo/vector-icons";

const GenerateDollar = ({ price }) => {
  const arrayDollar = [];
  if (price === "Inexpensive") {
    arrayDollar.push(
      <Foundation
        name="dollar"
        key={"first - dollar"}
        size={24}
        color="rgb(255, 176, 0)"
      />,
      <Foundation
        name="dollar"
        key={"second - dollar"}
        size={24}
        color="grey"
      />,
      <Foundation name="dollar" key={"third - dollar"} size={24} color="grey" />
    );
  }
  return arrayDollar;
};

export default GenerateDollar;
