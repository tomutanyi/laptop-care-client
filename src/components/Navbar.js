// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { HiHome, HiUserAdd, HiLogin, HiLogout } from 'react-icons/hi'; // Importing Tailwind Icons

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext); // Access user and logout from context

  const handleLogout = () => {
    logout(); // Use context's logout
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 p-4 min-w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          Laptop Care
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-md text-lg font-medium transition duration-200">
              <HiHome className="mr-2" /> Home
            </Link>
          </li>
          {user && (
            <li>
              <Link to={`/${user.role}`} className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-md text-lg font-medium transition duration-200">
                <HiUserAdd className="mr-2" /> Dashboard
              </Link>
            </li>
          )}
          {!user ? (
            // Show Signup and Login links if no user is logged in
            <>
              <li>
                <Link to="/signup" className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-md text-lg font-medium transition duration-200">
                  <HiUserAdd className="mr-2" /> Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center text-white hover:bg-blue-800 px-4 py-2 rounded-md text-lg font-medium transition duration-200">
                  <HiLogin className="mr-2" /> Login
                </Link>
              </li>
            </>
          ) : (
            // Show username and Logout button when user is logged in
            <>
              <li>
                <span className="text-white px-4 py-2 rounded-md text-lg font-medium">
                  Welcome, {user.username} ({user.role})
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:bg-red-700 px-4 py-2 rounded-md text-lg font-medium transition duration-200"
                >
                  <HiLogout className="mr-2" /> Logout
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