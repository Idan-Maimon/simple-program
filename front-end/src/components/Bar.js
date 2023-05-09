import React, { useEffect, useState } from 'react';
import './BarMenu.css';

function BarMenu() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [postId, setPostId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [drinkId, setDrinkId] = useState("");

  function addDrink() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "name": name,
        "description": description
      })
    };

    fetch('/api/drinks', requestOptions)
    .then(response => response.json())
    .then(data => {
      setPostId(data.id);
      setName("");
      setDescription("");
      getDrinks();
    });
  }


  function getDrinks() {
    fetch("/api/drinks")
      .then(response => response.json())
      .then(responseData => {
        setDrinks(responseData.drinks);
      });
  }

  function deleteDrink() {
    fetch(`/api/drinks/${drinkId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(del => {
        setDeleteId(del.id);
        setDrinkId("");
        return getDrinks();
      })
      .catch(error => console.error(error));
  }
  

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <div className="bar-menu-container">
      <h1>Menu</h1>
      <div className="drinks-container">
        {drinks.map((drink) => (
          <div key={drink.id} className="drink">
            <h3>{drink.name}</h3>
            <p>{drink.description}</p>
            <p>ID: {drink.id}</p>
          </div>
        ))}
      </div>
      <div className="add-drink-container">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Drink name"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Drink description"
        />
        <button type="submit" onClick={addDrink}>
          Add Drink
        </button>
      </div>
      {postId && <p>Drink added with ID {postId}</p>}
      <div className="delete-drink-container">
        <input
          type="text"
          name="name"
          value={drinkId}
          onChange={(e) => setDrinkId(e.target.value)}
          placeholder="Drink id"
        />
        <button type="submit" onClick={deleteDrink}>
          Delete Drink
        </button>
      </div>
      {deleteId && <p>Drink deleted with name {deleteId}</p>}
    </div>
  );
}

export default BarMenu;
