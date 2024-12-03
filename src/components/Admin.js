import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Admin = () => {
  const [jobCards, setJobCards] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalJobs: 0,
    statusDistribution: {},
    brandDistribution: {},
    monthlyJobs: {},
  });
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

  useEffect(() => {
    const calculateAnalytics = () => {
      const statusDist = jobCards.reduce((acc, card) => {
        acc[card.status] = (acc[card.status] || 0) + 1;
        return acc;
      }, {});

      const brandDist = jobCards.reduce((acc, card) => {
        const brand = card.device_brand || 'Unknown';
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
      }, {});

      const monthly = jobCards.reduce((acc, card) => {
        const date = new Date(card.created_at);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        return acc;
      }, {});

      setAnalytics({
        totalJobs: jobCards.length,
        statusDistribution: statusDist,
        brandDistribution: brandDist,
        monthlyJobs: monthly,
      });
    };

    calculateAnalytics();
  }, [jobCards]);

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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <h1 className="text-xl font-semibold text-gray-700">Loading Dashboard...</h1>
          <div className="animate-spin border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-16 h-16"></div>
          <p className="text-sm text-gray-500">Please wait a moment.</p>
        </div>
      ) : (
        <>
          {/* Analytics Overview */}
          <div className="w-full max-w-6xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Jobs</h3>
                <p className="text-3xl font-bold text-blue-600">{analytics.totalJobs}</p>
              </div>
              {Object.entries(analytics.statusDistribution).map(([status, count]) => (
                <div key={status} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700">{status}</h3>
                  <p className="text-3xl font-bold text-blue-600">{count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Status Distribution Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Distribution</h3>
              <Pie
                data={{
                  labels: Object.keys(analytics.statusDistribution),
                  datasets: [
                    {
                      data: Object.values(analytics.statusDistribution),
                      backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>

            {/* Brand Distribution Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Device Brands</h3>
              <Bar
                data={{
                  labels: Object.keys(analytics.brandDistribution),
                  datasets: [
                    {
                      label: 'Number of Devices',
                      data: Object.values(analytics.brandDistribution),
                      backgroundColor: '#36A2EB',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Job Cards List */}
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Cards</h2>
            <div className="w-full max-w-4xl space-y-6">
              {Object.keys(categorizedJobCards).map((status) => (
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
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
