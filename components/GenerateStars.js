import { FontAwesome } from "@expo/vector-icons";

const GenerateStars = ({ rating }) => {
  const starArray = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starArray.push(
        <FontAwesome name="star" size={24} color="rgb(255, 176, 0)" key={i} />
      );
    } else {
      if (i - 0.5 === rating) {
        starArray.push(
          <FontAwesome
            name="star-half-empty"
            size={24}
            color="rgb(255, 176, 0)"
            key={i}
          />
        );
      } else {
        starArray.push(
          <FontAwesome name="star" size={24} color="grey" key={i} />
        );
      }
    }
  }

  return starArray;
};

export default GenerateStars;
