import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const defaultBills = [
  {
    id: 1,
    name: "Rent",
    amount: 1450,
    dueDate: "June 1",
    person: "Shared",
    status: "Upcoming",
    payLocation: "Apartment Portal",
    payUrl: "",
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
    payLocation: "AES Indiana",
    payUrl: "",
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
    payLocation: "Internet Provider",
    payUrl: "",
    icon: "⌁",
    iconClass: "internet",
  },
];

const homeTasks = [
  {
    id: 1,
    title: "Grocery List",
    description: "Plan weekly groceries and shared household items.",
    buttonText: "Open List",
  },
  {
    id: 2,
    title: "House Purchases",
    description: "Track things to buy with priority levels.",
    buttonText: "View Items",
  },
  {
    id: 3,
    title: "Monthly Bills",
    description: "Track bills, due dates, and who is responsible.",
    buttonText: "View Bills",
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

const Home = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState(() => {
    const savedBills = localStorage.getItem("monthlyBills");
    return savedBills ? JSON.parse(savedBills) : defaultBills;
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: "",
    person: "Shared",
    status: "Upcoming",
    payLocation: "",
    payUrl: "",
  });

  useEffect(() => {
    localStorage.setItem("monthlyBills", JSON.stringify(bills));
  }, [bills]);

  const totalUpcoming = bills.reduce(
    (sum, bill) => sum + Number(bill.amount),
    0
  );

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
    <div className="home-page">
      <header className="home-hero">
        <div>
          <p className="eyebrow">Apartment Hub</p>
          <h1>Welcome home</h1>
          <p className="hero-text">
            Track bills, groceries, house purchases, and shared apartment tasks
            all in one place.
          </p>
        </div>

        <div className="hero-summary-card">
          <p>Upcoming Total</p>
          <h2>${totalUpcoming}</h2>
          <span>Across {bills.length} bills</span>
        </div>
      </header>

      <section className="section-header">
        <div>
          <h2>Upcoming Bills</h2>
          <p>Keep an eye on what’s due next.</p>
        </div>

        <button className="primary-btn" onClick={() => setShowModal(true)}>
          Add Bill
        </button>
      </section>

      <section className="bills-grid">
        {bills.map((bill) => (
          <div
            className="bill-card clickable"
            key={bill.id}
            onClick={() => setSelectedBill(bill)}
          >
            <div className="bill-card-top">
              <div className={`bill-icon ${bill.iconClass}`}>{bill.icon}</div>

              <div>
                <h3>{bill.name}</h3>
                <p>Due {bill.dueDate}</p>
              </div>

              <span
                className={`status-pill ${
                  bill.status === "Due Soon" ? "due-soon" : ""
                } ${bill.status === "Paid" ? "paid" : ""}`}
              >
                {bill.status}
              </span>
            </div>

            <div className="bill-card-bottom">
              <strong>${bill.amount}</strong>
              <span>{bill.person}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="section-header lower-section">
        <div>
          <h2>Apartment Tools</h2>
          <p>Quick access to the things you’ll use most.</p>
        </div>
      </section>

      <section className="tools-grid">
        {homeTasks.map((task) => (
          <div
            className="tool-card"
            key={task.id}
            onClick={() => {
              if (task.title === "Monthly Bills") navigate("/monthly-bills");
              if (task.title === "Grocery List") navigate("/grocery-list");
              if (task.title === "House Purchases")
                navigate("/apartment-purchases");
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button className="secondary-btn">{task.buttonText}</button>
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
                  <option value="Girlfriend">Girlfriend</option>
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
            </form>
          </div>
        </div>
      )}

      {selectedBill && (
        <div className="modal-overlay modal-scroll" onClick={() => setSelectedBill(null)}>
          <div
            className="bill-modal details-modal"
            onClick={(e) => e.stopPropagation()}
          >
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
    </div>
  );
};

export default Home;