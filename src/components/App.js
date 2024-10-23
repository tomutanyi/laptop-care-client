// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProvider
import Signup from './Signup';
import Navbar from './Navbar';
import Login from './Login';
import JobCard from './JobCard';
import Technician from './Technician';
import Admin from './Admin';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/home" element={<h1>Welcome to the Laptop Care App</h1>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<JobCard />} />
            <Route path="/technician" element={<Technician />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
