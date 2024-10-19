import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Laptop Care
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link 
              to="/" 
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/signup" 
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
