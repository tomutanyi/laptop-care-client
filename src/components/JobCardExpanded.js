import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobCardExpanded = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/jobcards/${jobId}/details`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      {jobDetails ? (
        <div className="p-6 bg-primary rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">{jobDetails.client_name}</h2>
          <p>Email: {jobDetails.client_email}</p>
          <p>Status: {jobDetails.jobcards_status}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobCardExpanded;
