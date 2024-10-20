// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Navbar from './Navbar';
import Login from './Login';
import JobCard from './JobCard';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<h1>Welcome to the Laptop Care App</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobCard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
 