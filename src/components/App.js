// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProvider
import Signup from './Signup';
import Navbar from './Navbar';
import Login from './Login';
import JobCard from './JobCard';
import Technician from './Technician';
import Admin from './Admin';
import Receptionist from './Receptionist';
import JobCardExpanded from './JobCardExpanded';
import Pricing from './Pricing';
import PricingExpanded from './PricingExpanded';
import Invoice from './Invoice';
import Home from './Home';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname === '/admin';
  
  return (
    <div>
      {/* Conditionally render Navbar based on the route */}
      <div className={isAdminDashboard ? "hidden" : "flex"}>
        <Navbar />
      </div>
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobcard" element={<JobCard />} />
        <Route path="/technician" element={<Technician />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/jobcard/:jobId" element={<JobCardExpanded />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/:jobId" element={<PricingExpanded />} />
        <Route path="/invoice/:jobId" element={<Invoice />} />
      </Routes>
    </div>
  );
};

export default App;
