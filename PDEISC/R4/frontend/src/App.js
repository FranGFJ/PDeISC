import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import AdminPanel from './components/AdminPanel';
import PortfolioView from './components/PortfolioView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/portfolio/:slug" element={<PortfolioView />} />
      </Routes>
    </Router>
  );
}

export default App;