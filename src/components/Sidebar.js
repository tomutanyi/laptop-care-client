import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHome, FaChartBar, FaCoins, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../components/UserContext"; // Assuming you have a UserContext for user data

const Sidebar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div className="w-64 bg-blue-900 text-white p-4">
      <div className="flex items-center justify-center mb-6">
        <FaUserCircle size={50} />
        <span className="ml-2 text-xl font-semibold">{user?.username}</span>
      </div>
      <div className="space-y-4">
        <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaHome className="mr-2" /> Home
        </Link>

        {/* Conditional rendering based on user role */}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              <FaChartBar className="mr-2" /> Admin Dashboard
            </Link>
            <Link to="/analytics" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              <FaChartBar className="mr-2" /> Analytics
            </Link>
            <Link to="/pricing" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              <FaCoins className="mr-2" /> Pricing
            </Link>
          </>
        )}

        {user?.role === 'technician' && (
          <>
            <Link to="/technician" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              <FaChartBar className="mr-2" /> Technician Dashboard
            </Link>
            <Link to="/assigned" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              <FaChartBar className="mr-2" /> Assigned Jobs
            </Link>
            <Link to="/approved" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
            <FaChartBar className="mr-2" /> Approved Jobs
          </Link>
          </>

        )}

        {user?.role === 'receptionist' && (
          <>
          <Link to="/receptionist" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
            <FaChartBar className="mr-2" /> Receptionist Dashboard
          </Link>
          <Link to="/jobcard" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
            <FaChartBar className="mr-2" /> New Job Card
          </Link>
          <Link to="/pending" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
            <FaChartBar className="mr-2" /> Pending Jobs
          </Link>
          <Link to="/rejected" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
            <FaChartBar className="mr-2" /> Rejected Jobs
          </Link>

          </>

        )}
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;