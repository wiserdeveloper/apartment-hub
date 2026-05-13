import React from "react";
import { useNavigate } from "react-router-dom";
import "./ApartmentPurchases.css";

const purchaseItems = [
  {
    id: 1,
    name: "Entryway Table",
    category: "Furniture",
    price: 120,
    priority: "High",
    status: "Need Soon",
  },
  {
    id: 2,
    name: "Kitchen Trash Can",
    category: "Kitchen",
    price: 45,
    priority: "Medium",
    status: "Planned",
  },
  {
    id: 3,
    name: "Bath Towels",
    category: "Bathroom",
    price: 35,
    priority: "Low",
    status: "Optional",
  },
  {
    id: 4,
    name: "TV Stand",
    category: "Living Room",
    price: 180,
    priority: "High",
    status: "Need Soon",
  },
];

const ApartmentPurchases = () => {
  const navigate = useNavigate();

  const totalEstimated = purchaseItems.reduce((sum, item) => sum + item.price, 0);
  const highPriorityCount = purchaseItems.filter(
    (item) => item.priority === "High"
  ).length;

  return (
    <div className="purchases-page">
      <header className="purchases-hero">
        <div>
          <p className="eyebrow">Apartment Purchases</p>
          <h1>Things to buy</h1>
        </div>

        <div className="purchases-total-card">
          <p>Estimated Total</p>
          <h2>${totalEstimated}</h2>
          <span>{highPriorityCount} high priority items</span>
        </div>
      </header>

      <section className="purchases-actions">
        <div>
          <h2>Purchase List</h2>
          <p>Prioritize what the apartment needs next.</p>
        </div>

        <button className="add-purchase-btn">+ Add Item</button>
      </section>

      <section className="purchase-list">
        {purchaseItems.map((item) => (
          <div className="purchase-card" key={item.id}>
            <div className={`priority-icon ${item.priority.toLowerCase()}`}>
              {item.priority === "High"
                ? "!"
                : item.priority === "Medium"
                ? "•"
                : "⌄"}
            </div>

            <div className="purchase-main-info">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <span className={`priority-pill ${item.priority.toLowerCase()}`}>
                {item.priority} Priority
              </span>
            </div>

            <div className="purchase-price-info">
              <strong>${item.price}</strong>
              <span>{item.status}</span>
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

export default ApartmentPurchases;