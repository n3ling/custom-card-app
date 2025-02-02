import React, { useState } from "react";
import CardForm from "./components/CardForm";
import Card from "./components/Card";

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("input");

  const handleFormSubmit = (data) => {
    setCards([...cards, data]);
    setCurrentScreen("cards");

    // Save JSON data to a file
    window.ipcRenderer.send("save-data", data);
  };

  const handleQuit = () => {
    window.ipcRenderer.send("confirm-quit");
  };

  return (
    <div>
      {currentScreen === "input" ? (
        <CardForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <button onClick={() => setCurrentScreen("input")}>
            Back to Input
          </button>
          {cards.map((card, index) => (
            <Card key={index} data={card} />
          ))}
        </div>
      )}
      <button onClick={handleQuit}>Quit</button>
    </div>
  );
};

export default App;
