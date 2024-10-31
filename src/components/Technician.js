import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const Technician = () => {
  const [jobCards, setJobCards] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchJobCards = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/jobcards?status=PENDING");
      
      if (!response.ok) {
        throw new Error("Failed to fetch job cards");
      }

      const data = await response.json();
      
      const enrichedJobCards = await Promise.all(data.map(async (jobCard) => {
        try {
          const jobCardDetailResponse = await fetch(`http://127.0.0.1:5000/jobcards/${jobCard.id}/details`);
          if (!jobCardDetailResponse.ok) {
            throw new Error(`Failed to fetch details for job card ID: ${jobCard.id}`);
          }
          
          const details = await jobCardDetailResponse.json();
          return { ...jobCard, ...details };
        } catch (error) {
          console.error(`Error fetching details for job card ID: ${jobCard.id}`, error);
          return jobCard;
        }
      }));

      setJobCards(enrichedJobCards);
    } catch (error) {
      console.error("Error fetching job cards:", error);
      enqueueSnackbar("Error fetching job cards.", { variant: "error" });
    }
  };

  const updateJobCard = async (id, status, notes, partsRequired) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/jobcards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          progress_notes: notes,
          // We may consider adding a field for parts required just in case we need approval to purchase spare parts.
        }),
      });

      if (!response.ok) throw new Error("Failed to update job card");

      enqueueSnackbar("Job card updated successfully", { variant: "success" });
      fetchJobCards(); // Refresh job cards
    } catch (error) {
      console.error("Error updating job card:", error);
      enqueueSnackbar("Error updating job card.", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchJobCards();
  }, []); // Only call once on mount

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pending Job Cards</h1>
      
      <div className="w-full max-w-4xl space-y-6">
        {jobCards.length > 0 ? (
          jobCards.map((jobCard) => (
            <div key={jobCard.id} className="p-6 bg-primary rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {jobCard.client_name || "Client Name Not Available"}
              </h2>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {jobCard.client_email || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Model:</span> {jobCard.device_model || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Brand:</span> {jobCard.device_brand || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Problem Description:</span> {jobCard.problem_description || "N/A"}</p>
              {/* Diagnostics entry form */}
              <textarea
                placeholder="Enter diagnostics"
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={(e) => updateJobCard(jobCard.id, "IN_PROGRESS", e.target.value, "List parts needed")}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => updateJobCard(jobCard.id, "IN_PROGRESS", "Diagnostics complete", "List parts needed")}
              >
                Forward to Admin
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No pending job cards available.</p>
        )}
      </div>
    </div>
  );
};

export default Technician;
