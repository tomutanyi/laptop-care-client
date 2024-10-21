// src/components/App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Navbar from './Navbar';
import Login from './Login';
import JobCard from './JobCard';


const App = () => {

  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
  setUser(userData);
  console.log('Logged in user:', userData);
  };
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<h1>Welcome to the Laptop Care App</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/jobs" element={<JobCard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
 