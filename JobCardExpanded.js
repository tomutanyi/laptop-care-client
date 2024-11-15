import React from "react";

const JobCardExpanded = ({ jobCard, onClose }) => {
  if (!jobCard) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {jobCard.client_name || "Client Name Not Available"}
        </h2>
        <p className="mb-2"><span className="font-medium">Email:</span> {jobCard.client_email || "N/A"}</p>
        <p className="mb-2"><span className="font-medium">Device Model:</span> {jobCard.device_model || "N/A"}</p>
        <p className="mb-2"><span className="font-medium">Device Brand:</span> {jobCard.device_brand || "N/A"}</p>
        <p className="mb-2"><span className="font-medium">Issue Description:</span> {jobCard.issue_description || "N/A"}</p>
        <p className="mb-2"><span className="font-medium">Created Date:</span> {jobCard.created_date || "N/A"}</p>
        <p className="mb-2"><span className="font-medium">Status:</span> {jobCard.status || "N/A"}</p>
      </div>
    </div>
  );
};

export default JobCardExpanded;