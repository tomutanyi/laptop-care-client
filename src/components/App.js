// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProvider
import Signup from './Signup';
import Navbar from './Navbar';
import Login from './Login';
import JobCard from './JobCard';
import Technician from './Technician';
import Analytics from './Analytics';
import Receptionist from './Receptionist';
import ApprovedExpanded from './ApprovedExpanded';
import Pricing from './Pricing';
import PricingExpanded from './PricingExpanded';
import Invoice from './Invoice';
import Home from './Home';
import Approved from './Approved';
import Assigned from './Assigned';
import AssignedExpanded from './AssignedExpanded';
import Pending from './Pending';
import PendingExpanded from './PendingExpanded';
import Admin from './Admin';
import Rejected from './Rejected';

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
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/approved/:jobId" element={<ApprovedExpanded />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/:jobId" element={<PricingExpanded />} />
        <Route path="/invoice/:jobId" element={<Invoice />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/approved" element={<Approved />} />
        <Route path="/assigned" element={<Assigned />} />
        <Route path="/assigned/:jobId" element={<AssignedExpanded />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/pending/:jobId" element={<PendingExpanded />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rejected" element={<Rejected />} />
      </Routes>
    </div>
  );
};

export default App;
