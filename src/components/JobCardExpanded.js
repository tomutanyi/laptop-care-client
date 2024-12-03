import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const JobCardExpanded = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [jobDetails, setJobDetails] = useState(null);
  const [diagnostic, setDiagnostic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/jobcards/${jobId}/details`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJobDetails(data);
        setDiagnostic(data.diagnostic || "");
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSaveDiagnostic = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/jobcards/${jobId}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diagnostic: diagnostic
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update diagnostic");
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating diagnostic:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusUpdate = async () => {
    setIsModalOpen(false);
    setIsUpdatingStatus(true);
    try {
      const response = await fetch(`http://localhost:5000/jobcards/${jobId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Pricing'
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      
      // Update local state
      setJobDetails(prev => ({
        ...prev,
        status: 'Pricing'
      }));

      enqueueSnackbar("Status updated successfully", { variant: "success" });
      // Navigate back to dashboard after successful update
      navigate('/technician');
    } catch (error) {
      console.error("Error updating status:", error);
      enqueueSnackbar("Failed to update status", { variant: "error" });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      {jobDetails ? (
        <>
          <div className="p-6 bg-primary rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Job Card #{jobDetails.jobcard_id}</h2>
              <div className="flex gap-3">
                {jobDetails.status !== 'Pricing' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={isUpdatingStatus}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                  >
                    {isUpdatingStatus ? "Updating..." : "Move to Pricing"}
                  </button>
                )}
                <button
                  onClick={() => navigate('/technician')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Device Information</h3>
              <p className="text-gray-600">
                {jobDetails.device_brand} {jobDetails.device_model}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium">Problem Description</h3>
              <p className="text-gray-600">{jobDetails.problem_description}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium">Diagnostic</h3>
              {isEditing ? (
                <div className="mt-2">
                  <textarea
                    value={diagnostic}
                    onChange={(e) => setDiagnostic(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="4"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleSaveDiagnostic}
                      disabled={isSaving}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setDiagnostic(jobDetails.diagnostic || "");
                      }}
                      disabled={isSaving}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-gray-600">{diagnostic || "No diagnostic information available"}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit Diagnostic
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Confirmation Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                    <svg 
                      className="h-8 w-8 text-blue-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Move to Pricing</h3>
                  <p className="text-gray-600 mb-6">Are you sure you want to move this job card to Pricing status?</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobCardExpanded;
