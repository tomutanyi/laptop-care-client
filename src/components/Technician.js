import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const Technician = () => {
  const [jobCards, setJobCards] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/jobcards?status=Pending");
        
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

    fetchJobCards();
  }, [enqueueSnackbar]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pending Job Cards</h1>
      
      <div className="w-full max-w-4xl space-y-6">
        {jobCards.length > 0 ? (
          jobCards.map((jobCard, index) => (
            <div key={index} className="p-6 bg-primary rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {jobCard.client_name || "Client Name Not Available"}
              </h2>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {jobCard.client_email || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Model:</span> {jobCard.device_model || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Brand:</span> {jobCard.device_brand || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Problem Description:</span> {jobCard.problem_description || "N/A"}</p>
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
