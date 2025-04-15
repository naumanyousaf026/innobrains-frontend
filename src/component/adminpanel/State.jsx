import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave"; // adjust path as needed

export default function StatePreview({ setSection }) {
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

  // Navigate to StateForm
  const navigateToStateForm = () => {
    setSection("stateForm");
  };

  if (loading) {
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full">
      {/* Navigation button at the top */}
      <div className="flex justify-end mb-4 px-4">
        <button
          onClick={navigateToStateForm}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold shadow-md transition duration-300"
        >
          Go to State Form
        </button>
      </div>

      {showData ? (
        <div className="w-full">
          <Wave />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="mb-4 text-lg text-gray-500">
            No data available. Please add content from the State Form.
          </p>
          <button
            onClick={navigateToStateForm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
          >
            Go to State Form
          </button>
        </div>
      )}
    </div>
  );
}