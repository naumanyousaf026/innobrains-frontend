import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave"; // adjust path as needed

export default function StatePreview() {
  const [showData, setShowData] = useState(false);
  const [statsId, setStatsId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Navigate to form page
  const navigateToForm = () => {
    window.location.href = "/stats-form"; // Adjust the route as needed
  };
  
  if (loading) {
    return <p className="ml-[150px] text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="ml-[250px] mt-5 px-4">
      <Wave />
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <div className="flex justify-end space-x-4 mb-4">
          {showData && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Delete
            </button>
          )}
          <button
            onClick={navigateToForm}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            {showData ? "Edit" : "Add New"}
          </button>
        </div>
        
        {showData ? (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Stats data exists and can be edited or deleted</p>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-gray-700">No stats data available. Add new data using the button above.</p>
          </div>
        )}
      </div>
    </div>
  );
}