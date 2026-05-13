import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MonthlyBills.css";

const defaultBills = [
  {
    id: 1,
    name: "Rent",
    amount: 1450,
    dueDate: "June 1",
    person: "Shared",
    status: "Upcoming",
    icon: "⌂",
    iconClass: "rent",
  },
  {
    id: 2,
    name: "Electric",
    amount: 92,
    dueDate: "May 18",
    person: "Alyssa",
    status: "Due Soon",
    icon: "⚡",
    iconClass: "electric",
  },
  {
    id: 3,
    name: "Internet",
    amount: 65,
    dueDate: "May 22",
    person: "Girlfriend",
    status: "Upcoming",
    icon: "⌁",
    iconClass: "internet",
  },
  {
    id: 4,
    name: "Water",
    amount: 48,
    dueDate: "May 27",
    person: "Shared",
    status: "Upcoming",
    icon: "💧",
    iconClass: "water",
  },
];

const getBillIcon = (name) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("rent")) return { icon: "⌂", iconClass: "rent" };
  if (lowerName.includes("electric")) return { icon: "⚡", iconClass: "electric" };
  if (lowerName.includes("internet")) return { icon: "⌁", iconClass: "internet" };
  if (lowerName.includes("water")) return { icon: "💧", iconClass: "water" };

  return { icon: "$", iconClass: "default" };
};

const MonthlyBills = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState(() => {
    const savedBills = localStorage.getItem("monthlyBills");
    return savedBills ? JSON.parse(savedBills) : defaultBills;
  });

  const [showModal, setShowModal] = useState(false);

 const [newBill, setNewBill] = useState({
  name: "",
  amount: "",
  dueDate: "",
  person: "Shared",
  status: "Upcoming",
  payLocation: "",
  payUrl: "",
});

  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    localStorage.setItem("monthlyBills", JSON.stringify(bills));
  }, [bills]);

  const total = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewBill((prevBill) => ({
      ...prevBill,
      [name]: value,
    }));
  };

  const handleAddBill = (e) => {
    e.preventDefault();

    const iconData = getBillIcon(newBill.name);

    const billToAdd = {
      id: Date.now(),
      ...newBill,
      amount: Number(newBill.amount),
      ...iconData,
    };

    setBills((prevBills) => [...prevBills, billToAdd]);

    setNewBill({
  name: "",
  amount: "",
  dueDate: "",
  person: "Shared",
  status: "Upcoming",
  payLocation: "",
  payUrl: "",
});

    setShowModal(false);
  };

  const handleStatusUpdate = (id, newStatus) => {
  setBills((prevBills) =>
    prevBills.map((bill) =>
      bill.id === id ? { ...bill, status: newStatus } : bill
    )
  );

  setSelectedBill((prevBill) =>
    prevBill ? { ...prevBill, status: newStatus } : null
  );
};

const handleDeleteBill = (id) => {
  setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  setSelectedBill(null);
};

  return (
    <div className="bills-page">
      <header className="bills-hero">
        <div>
          <p className="eyebrow">Monthly Bills</p>
          <h1>Track what’s due</h1>
        </div>

        <div className="bills-total-card">
          <p>Monthly Total</p>
          <h2>${total}</h2>
          <span>{bills.length} active bills</span>
        </div>
      </header>

      <section className="bills-actions">
        <div>
          <h2>All Bills</h2>
        </div>

        <button className="add-bill-btn" onClick={() => setShowModal(true)}>
          + Add Bill
        </button>
      </section>

      <section className="monthly-bills-list">
  {bills.map((bill) => (
    <div
      className="monthly-bill-card clickable"
      key={bill.id}
      onClick={() => setSelectedBill(bill)}
    >
      <div className={`bill-icon ${bill.iconClass}`}>{bill.icon}</div>

      <div className="bill-main-info">
        <h3>{bill.name}</h3>
        <p>Due {bill.dueDate}</p>

        <span
          className={`status-pill ${
            bill.status === "Due Soon" ? "due-soon" : ""
          } ${bill.status === "Paid" ? "paid" : ""}`}
        >
          {bill.status}
        </span>
      </div>

      <div className="bill-price-info">
        <strong>${bill.amount}</strong>
        <span>{bill.person}</span>
      </div>
    </div>
  ))}
</section>

      {showModal && (
        <div className="modal-overlay modal-scroll">
          <div className="bill-modal">
            <div className="modal-header">
              <div>
                <p className="eyebrow">New Bill</p>
                <h2>Add Monthly Bill</h2>
              </div>

              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleAddBill} className="bill-form">
              <label>
                Bill Name
                <input
                  type="text"
                  name="name"
                  value={newBill.name}
                  onChange={handleInputChange}
                  placeholder="Rent, Electric, Internet..."
                  required
                />
              </label>

              <label>
                Amount
                <input
                  type="number"
                  name="amount"
                  value={newBill.amount}
                  onChange={handleInputChange}
                  placeholder="120"
                  required
                />
              </label>

              <label>
                Due Date
                <input
                  type="text"
                  name="dueDate"
                  value={newBill.dueDate}
                  onChange={handleInputChange}
                  placeholder="June 1"
                  required
                />
              </label>

              <label>
                Responsible Person
                <select
                  name="person"
                  value={newBill.person}
                  onChange={handleInputChange}
                >
                  <option value="Shared">Shared</option>
                  <option value="Alyssa">Alyssa</option>
                  <option value="Girlfriend">Victoria</option>
                </select>
              </label>

              <label>
  Status
  <select
    name="status"
    value={newBill.status}
    onChange={handleInputChange}
  >
    <option value="Upcoming">Upcoming</option>
    <option value="Due Soon">Due Soon</option>
    <option value="Paid">Paid</option>
  </select>
</label>

<label>
  Where to Pay
  <input
    type="text"
    name="payLocation"
    value={newBill.payLocation}
    onChange={handleInputChange}
    placeholder="Apartment portal, AES, Citizens..."
  />
</label>

<label>
  Payment Website
  <input
    type="url"
    name="payUrl"
    value={newBill.payUrl}
    onChange={handleInputChange}
    placeholder="https://..."
  />
</label>

<button className="submit-bill-btn" type="submit">
  Save Bill
</button>

              <button className="submit-bill-btn" type="submit">
                Save Bill
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedBill && (
  <div className="modal-overlay modal-scroll" onClick={() => setSelectedBill(null)}>
    <div className="bill-modal details-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div>
          <p className="eyebrow">Bill Details</p>
          <h2>{selectedBill.name}</h2>
        </div>

        <button className="modal-close" onClick={() => setSelectedBill(null)}>
          ×
        </button>
      </div>

      <div className="details-summary">
        <div className={`bill-icon ${selectedBill.iconClass}`}>
          {selectedBill.icon}
        </div>

        <div>
          <p>Amount</p>
          <h3>${selectedBill.amount}</h3>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span>Due Date</span>
          <strong>{selectedBill.dueDate}</strong>
        </div>

        <div className="detail-item">
          <span>Responsible</span>
          <strong>{selectedBill.person}</strong>
        </div>

        <div className="detail-item">
          <span>Status</span>
          <select
            value={selectedBill.status}
            onChange={(e) =>
              handleStatusUpdate(selectedBill.id, e.target.value)
            }
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Due Soon">Due Soon</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="detail-item">
          <span>Where to Pay</span>
          <strong>{selectedBill.payLocation || "Not added yet"}</strong>
        </div>
      </div>

      {selectedBill.payUrl && (
        <a
          className="pay-link-btn"
          href={selectedBill.payUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Payment Site
        </a>
      )}

      <button
        className="delete-detail-btn"
        onClick={() => handleDeleteBill(selectedBill.id)}
      >
        Delete Bill
      </button>
    </div>
  </div>
)}

      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default MonthlyBills;