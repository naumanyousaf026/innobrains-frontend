import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave";
import StateForm from "./StateForm";
import { IoArrowBackSharp } from "react-icons/io5"; // Back icon

export default function StatePreview() {
  const [showData, setShowData] = useState(false);
  const [statsId, setStatsId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://apis.innobrains.pk/api/stats");
        if (res.data.length > 0) {
          setStatsId(res.data[0]._id);
          setEditData(res.data[0]);
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

  const handleDelete = async () => {
    if (!statsId) {
      alert("No stats data to delete.");
      return;
    }
    try {
      await axios.delete(`https://apis.innobrains.pk/api/stats/${statsId}`);
      setShowData(false);
      setStatsId(null);
      setEditData(null);
      alert("Stats deleted successfully.");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete stats.");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormClose = () => {
    setShowForm(false);
    window.location.reload(); // or re-fetch
  };

  if (loading) {
    return <p className="ml-[150px] text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full mt-5 px-4">
      <div className="flex justify-end space-x-4 mb-4">
        {!showForm && (
          <button
            onClick={toggleForm}
            className="bg-black text-white py-2 px-4 rounded-md transition duration-300"
          >
            {showData ? "Edit" : "Add New"}
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-4 mt-1">
          {/* Back Button */}
          <button
            onClick={() => setShowForm(false)}
            className="flex items-center text-sm text-gray-700 hover:text-black mb-4"
          >
            <IoArrowBackSharp className="mr-2 text-lg" />
            Back
          </button>

          <StateForm data={editData} onClose={handleFormClose} />
        </div>
      ) : (
        <>
          <Wave className="w-[80%] ml-auto p-5 mt-5 px-4" />

          <div className="bg-white rounded-lg shadow-md p-4 mt-1">
            <div className="space-x-4 mb-2 px-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-10 rounded-md transition duration-300"
              >
                Delete
              </button>
            </div>

            {showData && (
              <div className="mt-4 text-center">
                <p className="text-gray-700">Stats data exists and can be edited or deleted.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
