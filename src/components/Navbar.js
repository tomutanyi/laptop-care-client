// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext); // Access user and logout from context

  const handleLogout = () => {
    logout(); // Use context's logout
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Laptop Care
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
          </li>
          {!user ? (
            // Show Signup and Login links if no user is logged in
            <>
              <li>
                <Link to="/signup" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
              </li>
            </>
          ) : (
            // Show username and Logout button when user is logged in
            <>
              <li>
                <span className="text-white px-3 py-2 rounded-md text-sm font-medium">
                  Welcome, {user.username} ({user.role})
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
