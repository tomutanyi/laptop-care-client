import React from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const Receptionist = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> {/* Render the Sidebar component */}

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Receptionist Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome to the Receptionist Dashboard. Here you can manage clients, view open jobs, and perform administrative tasks.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-600">
            Use the sidebar to navigate through different sections of the technician panel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receptionist;