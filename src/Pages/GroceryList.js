import React from "react";
import { useNavigate } from "react-router-dom";
import "./GroceryList.css";

const groceryItems = [
  { id: 1, name: "Milk", category: "Dairy", quantity: "1 gallon", checked: false },
  { id: 2, name: "Eggs", category: "Dairy", quantity: "12 count", checked: false },
  { id: 3, name: "Chicken", category: "Meat", quantity: "2 lbs", checked: false },
  { id: 4, name: "Rice", category: "Pantry", quantity: "1 bag", checked: true },
];

const GroceryList = () => {
  const navigate = useNavigate();

  return (
    <div className="grocery-page">
      <header className="grocery-hero">
        <div>
          <p className="eyebrow">Grocery List</p>
          <h1>Our next grocery run</h1>
        </div>

        <div className="grocery-total-card">
          <p>Items Needed</p>
          <h2>{groceryItems.filter((item) => !item.checked).length}</h2>
          <span>{groceryItems.length} total items</span>
        </div>
      </header>

      <section className="grocery-actions">
        <div>
          <h2>Shopping List</h2>
          <p>Shared household groceries.</p>
        </div>

        <button className="add-grocery-btn">+ Add Item</button>
      </section>

      <section className="grocery-list">
        {groceryItems.map((item) => (
          <div className={`grocery-card ${item.checked ? "checked" : ""}`} key={item.id}>
            <div className="grocery-check">
              {item.checked ? "✓" : ""}
            </div>

            <div className="grocery-main-info">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>

            <div className="grocery-quantity">
              <span>{item.quantity}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default GroceryList;