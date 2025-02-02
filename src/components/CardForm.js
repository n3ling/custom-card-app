import React, { useState } from "react";

const CardForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rarity, setRarity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = new Date();
    const updatedAt = new Date();
    onSubmit({ title, description, rarity, image, createdAt, updatedAt });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Rarity"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CardForm;
