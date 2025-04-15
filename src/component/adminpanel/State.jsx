import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave"; // adjust path as needed

export default function StatePreview() {
  const [showData, setShowData] = useState(false);
  const [statsId, setStatsId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

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
    if (!statsId) {
      alert("No stats data to delete.");
      return;
    }
    try {
      await axios.delete(`https://apis.innobrains.pk/api/stats/${statsId}`);
      setShowData(false);
      setStatsId(null);
      alert("Stats deleted successfully.");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete stats.");
    }
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (loading) {
    return <p className="ml-[150px] text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="ml-[250px] mt-5 px-4">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={toggleForm} // Toggle form visibility on click
          className="bg-black text-white py-2 px-4 rounded-md transition duration-300"
        >
          {showForm ? "Cancel" : showData ? "Edit" : "Add New"}
        </button>
      </div>

      <Wave className="w-[80%] ml-auto p-5 mt-5 px-4" />

      <div className="bg-white rounded-lg shadow-md p-4 mt-1">
        <div className="space-x-4 mb-2 px-4">
          {/* Always visible Delete button */}
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-10 rounded-md transition duration-300"
          >
            Delete
          </button>
        </div>

        {/* Show form if showForm is true */}
        {showForm ? (
          <div className="mt-4">
            <h2 className="text-center text-lg font-semibold">Add New Stats</h2>
            <form>
              {/* Your form fields go here */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter Stats"
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-4 text-center">
            {showData ? (
              <p className="text-gray-700">Stats data exists and can be edited or deleted.</p>
            ) : (
              <p className="text-gray-700">No stats data available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
