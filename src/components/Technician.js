import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

const Technician = () => {
  const [jobCards, setJobCards] = useState([]);
  const [pendingJobCards, setPendingJobCards] = useState([]);
  const [approvedJobCards, setApprovedJobCards] = useState([]);
  // const [diagnostics, setDiagnostics] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const fetchJobCards = async () => {
    try {
      console.log("Fetching job cards...");
      const response = await fetch("http://127.0.0.1:5000/jobcards");
      if (!response.ok) {
        throw new Error("Failed to fetch job cards");
      }

      const data = await response.json();
      console.log("Job cards fetched:", data);

      // Filter job cards based on status
      const filteredJobCards = data.filter(
        jobCard =>
          jobCard.status === 'Pending' || jobCard.status === 'Approved'
      );
      console.log("Filtered job cards:", filteredJobCards);

      // Enrich filtered job cards with additional details
      const enrichedJobCards = await Promise.all(filteredJobCards.map(async (jobCard) => {
        try {
          console.log(`Fetching details for job card ID: ${jobCard.id}`);
          const jobCardDetailResponse = await fetch(`http://127.0.0.1:5000/jobcards/${jobCard.id}/details`);
          if (!jobCardDetailResponse.ok) {
            throw new Error(`Failed to fetch details for job card ID: ${jobCard.id}`);
          }

          const details = await jobCardDetailResponse.json();
          console.log(`Details fetched for job card ID: ${jobCard.id}`, details);
          return { ...jobCard, ...details };
        } catch (error) {
          console.error(`Error fetching details for job card ID: ${jobCard.id}`, error);
          return jobCard; // Return job card without details if fetch fails
        }
      }));

      // Categorize enriched job cards by status
      setPendingJobCards(enrichedJobCards.filter(jobCard => jobCard.status === 'Pending'));
      setApprovedJobCards(enrichedJobCards.filter(jobCard => jobCard.status === 'Approved'));
      setJobCards(enrichedJobCards); // Set the enriched job cards to state
      console.log("Enriched job cards set to state:", enrichedJobCards);
    } catch (error) {
      console.error("Error fetching job cards:", error);
      enqueueSnackbar("Error fetching job cards.", { variant: "error" });
    }
  };

  const updateJobCard = async (id, status, notes) => {
    try {
      console.log(`Updating job card ID: ${id} to status: ${status} with notes: ${notes}`);
      const response = await fetch(`http://127.0.0.1:5000/jobcards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          progress_notes: notes,
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

  const resolveJobCard = async (id, notes) => {
    console.log(`Resolving job card ID: ${id} with notes: ${notes}`);
    await updateJobCard(id, "RESOLVED", notes);
  };

  useEffect(() => {
    fetchJobCards();
  }, []); // Only call once on mount

  const validationSchema = Yup.object().shape({
  diagnostics: Yup.string().required("Diagnostics are required"),
  });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      {/* Section for Pending Job Cards */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pending Job Cards</h1>
      <div className="w-full max-w-4xl space-y-6">
        {pendingJobCards.length > 0 ? (
          pendingJobCards.map((jobCard) => (
            <div key={jobCard.id} className="p-6 bg-primary rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {jobCard.client_name || "Client Name Not Available"}
              </h2>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {jobCard.client_email || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Model:</span> {jobCard.device_model || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Brand:</span> {jobCard.device_brand || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Problem Description:</span> {jobCard.problem_description || "N/A"}</p>
              <Formik
                initialValues={{ diagnostics: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  updateJobCard(jobCard.id, "IN_PROGRESS", values.diagnostics);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Field
                      as="textarea"
                      name="diagnostics"
                      placeholder="Enter Remarks"
                      className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="diagnostics" component="div" className="text-red-600 mb-2" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Forward to Admin
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No pending job cards available.</p>
        )}
      </div>

      {/* Section for Approved Job Cards */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-12">Approved Job Cards for Repair</h1>
      <div className="w-full max-w-4xl space-y-6">
        {approvedJobCards.length > 0 ? (
          approvedJobCards.map((jobCard) => (
            <div key={jobCard.id} className="p-6 bg-primary rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {jobCard.client_name || "Client Name Not Available"}
              </h2>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {jobCard.client_email || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Model:</span> {jobCard.device_model || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Device Brand:</span> {jobCard.device_brand || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Problem Description:</span> {jobCard.problem_description || "N/A"}</p>
              <p className="text-gray-600"><span className="font-medium">Diagnostics:</span> {jobCard.progress_notes || "N/A"}</p>
                           <Formik
                initialValues={{ diagnostics: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  resolveJobCard(jobCard.id, values.diagnostics);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Field
                      as="textarea"
                      name="diagnostics"
                      placeholder="Enter remarks"
                      className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="diagnostics" component="div" className="text-red-600 mb-2" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Resolve Job Card
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-500">No approved job cards available.</p>
        )}
      </div>
    </div>
  );
};

export default Technician;
