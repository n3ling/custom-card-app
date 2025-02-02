import React, { useState, useEffect } from "react";
import CardForm from "./components/CardForm";
import Card from "./components/Card";

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("input");

  useEffect(() => {
    // Load initial data from the main process
    window.ipcRenderer.invoke("load-data").then((initialData) => {
      if (Array.isArray(initialData)) {
        setCards(initialData);
      } else {
        setCards([]);
      }
    });
  }, []);

  const handleFormSubmit = (data) => {
    setCards((prevCards) => {
      const updatedCards = Array.isArray(prevCards)
        ? [...prevCards, data]
        : [data];
      window.ipcRenderer.send("save-data", updatedCards);
      return updatedCards;
    });
    setCurrentScreen("cards");
  };

  const handleQuit = () => {
    window.ipcRenderer.send("confirm-quit");
  };

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentScreen("input")}>Create Card</button>
        <button onClick={() => setCurrentScreen("cards")}>View Cards</button>
        <button onClick={handleQuit}>Quit</button>
      </nav>

      {currentScreen === "input" ? (
        <CardForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          {cards.map((card, index) => (
            <Card key={index} data={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
