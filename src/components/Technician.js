import React from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const Technician = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> {/* Render the Sidebar component */}

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Technician Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome to the Technician Dashboard. Here you can view assigned and approved job cards.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-600">
            Use the sidebar to navigate through different sections of the Technician panel. You can manage job cards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Technician;