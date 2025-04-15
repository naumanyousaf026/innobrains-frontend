import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave"; // adjust path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function StatePreview() {
  const [showData, setShowData] = useState(false);
  const [statsId, setStatsId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch stats to get ID
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://apis.innobrains.pk/api/stats");
        if (res.data.length > 0) {
          setStatsId(res.data[0]._id);
          setShowData(true);
        } else {
          setShowData(false);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Handle Delete with API
  const handleDelete = async () => {
    if (!statsId) return;
    try {
      await axios.delete(`https://apis.innobrains.pk/api/stats/${statsId}`);
      setShowData(false);
      setStatsId(null);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  // Navigate to the form page
  const handleNavigateToForm = () => {
    navigate('/form'); // Replace '/form' with the actual path to your form page
  };

  if (loading) {
    return <p className="ml-[150px] text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="ml-[250px] mt-5 px-4">
      {showData ? (
        <>
          <Wave />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
            >
              Delete
            </button>
            <button
              onClick={handleNavigateToForm}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
            >
              Go to Form
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="mb-4 text-lg">
            No data available. Click the button below to go to the form.
          </p>
          <button
            onClick={handleNavigateToForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Go to Form
          </button>
        </div>
      )}
    </div>
  );
}