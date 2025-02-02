import React from "react";
import placeholderImage from "../images/logo192.png";

const Card = ({ data }) => {
  let imageUrl = placeholderImage;
  if (data.image && data.image instanceof File) {
    imageUrl = URL.createObjectURL(data.image);
  }

  return (
    <div className="card">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>
        <strong>Rarity:</strong> {data.rarity}
      </p>
      <img src={imageUrl} alt={data.title} />
    </div>
  );
};

export default Card;
