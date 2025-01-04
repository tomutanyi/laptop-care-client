// src/components/Home.js
import React from 'react';


const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome to the Laptop Care Internal Portal
            </h1>
            <p className="mt-4 text-lg sm:mt-6">
              Manage job cards, pricing, invoices, and more in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/admin"
              className="block p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">Admin Dashboard</h3>
              <p className="mt-2 text-sm text-gray-600">
                Access analytics, job card overviews, and manage staff accounts.
              </p>
            </Link>
            <Link
              to="/technician"
              className="block p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">Technician Panel</h3>
              <p className="mt-2 text-sm text-gray-600">
                View assigned jobs, update progress, and communicate with the team.
              </p>
            </Link>
            <Link
              to="/receptionist"
              className="block p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">Receptionist Tools</h3>
              <p className="mt-2 text-sm text-gray-600">
                Create new job cards, update customer details, and manage schedules.
              </p>
            </Link>
            <Link
              to="/pricing"
              className="block p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">Pricing Management</h3>
              <p className="mt-2 text-sm text-gray-600">
                Adjust service pricing and generate estimates.
              </p>
            </Link>
            <Link
              to="/invoice"
              className="block p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">Invoice Management</h3>
              <p className="mt-2 text-sm text-gray-600">
                Generate and track customer invoices efficiently.
              </p>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Staff Role Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Staff Roles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-800">Admin</h3>
              <p className="mt-2 text-sm text-gray-600">
                Oversee operations, manage analytics, and handle user accounts.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-800">Technician</h3>
              <p className="mt-2 text-sm text-gray-600">
                Update job statuses, track progress, and resolve customer issues.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-800">Receptionist</h3>
              <p className="mt-2 text-sm text-gray-600">
                Interface with customers, create job cards, and manage scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
