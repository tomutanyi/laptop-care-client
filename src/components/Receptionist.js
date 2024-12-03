import React from 'react';
import { Link } from 'react-router-dom';

const Receptionist = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-tl from-yellow-50 to-yellow-100 items-center justify-center">
      <Link to="/jobcard">
        <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600">
          Go to Job Card
        </button>
      </Link>
    </div>
  );
};

export default Receptionist;
