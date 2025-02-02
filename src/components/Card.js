import React from "react";

const Card = ({ data }) => (
  <div className="card">
    <h2>{data.title}</h2>
    <p>{data.description}</p>
    <p>
      <strong>Rarity:</strong> {data.rarity}
    </p>
    <img src={URL.createObjectURL(data.image)} alt={data.title} />
  </div>
);

export default Card;
