import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const Admin = () => {
  const [jobCards, setJobCards] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchJobCards = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/jobcards");
        
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
      } finally {
        setLoading(false);
      }
    };

    fetchJobCards();
  }, [enqueueSnackbar]);

  // Function to handle category click
  const handleCategoryClick = (status) => {
    setExpandedCategory(expandedCategory === status ? null : status);
  };

  // Categorizing job cards by status
  const categorizedJobCards = jobCards.reduce((acc, jobCard) => {
    const { status } = jobCard; 
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(jobCard);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Cards</h1>
      
      <div className="w-full max-w-4xl space-y-6">
        {loading ? ( // Show spinner while loading
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <h1 className="text-xl font-semibold text-gray-700">Loading Job Cards...</h1>
          <div className="animate-spin border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-16 h-16"></div>
          <p className="text-sm text-gray-500">Please wait a moment.</p>
        </div>
        ) : Object.keys(categorizedJobCards).length > 0 ? (
          Object.keys(categorizedJobCards).map((status) => (
            <div key={status}>
              <h2 
                className="text-xl font-semibold text-gray-700 mb-2 cursor-pointer"
                onClick={() => handleCategoryClick(status)}
              >
                {status} ({categorizedJobCards[status].length})
              </h2>
              {expandedCategory === status && (
                <div className="space-y-4">
                  {categorizedJobCards[status].map((jobCard, index) => (
                    <div key={index} className="p-6 bg-primary rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {jobCard.client_name || "Client Name Not Available"}
                      </h3>
                      <p className="text-gray-600"><span className="font-medium">Email:</span> {jobCard.client_email || "N/A"}</p>
                      <p className="text-gray-600"><span className="font-medium">Device Model:</span> {jobCard.device_model || "N/A"}</p>
                      <p className="text-gray-600"><span className="font-medium">Device Brand:</span> {jobCard.device_brand || "N/A"}</p>
                      <p className="text-gray-600"><span className="font-medium">Problem Description:</span> {jobCard.problem_description || "N/A"}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No job cards available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
