import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import MonthlyBills from './Pages/MonthlyBills';
import GroceryList from './Pages/GroceryList';
import ApartmentPurchases from './Pages/ApartmentPurchases';


import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bills" element={<MonthlyBills />} />
      <Route path="/groceries" element={<GroceryList />} />
      <Route path="/purchases" element={<ApartmentPurchases />} />
    </Routes>
  );
}

export default App;
