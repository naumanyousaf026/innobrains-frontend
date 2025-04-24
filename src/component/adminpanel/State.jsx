import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave"; // Adjust the path if needed
import StateForm from "./StateForm";
import { IoMdArrowBack } from "react-icons/io";
import { IoAddSharp, IoArrowBackSharp } from "react-icons/io5";

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
    window.location.reload(); // Or refetch if preferred
  };

  if (loading) {
    return <p className="ml-[150px] text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full mt-5 px-4">
      {/* Top Right Add/Edit Button */}
      {!showForm && (
        <div className="flex justify-end space-x-4 mb-4">
          <button
            onClick={toggleForm}
            className="bg-[#3b82f6] w-32  text-white py-2 px-4 rounded-md transition duration-300 flex items-center space-x-2"
          >
            <IoAddSharp className="text-bla mx-2 text-lg" />
            <span>{showData ? "Edit" : "Add New"}</span>
          </button>
        </div>
      )}

      {/* Show Form */}
      {showForm ? (
        <div className="bg-white rounded-lg  p-4 mt-1 relative">
          {/* Back Icon */}
          <button
            onClick={toggleForm}
            className="absolute top-4 left-4 flex items-center text-black hover:text-gray-700 transition duration-300"
          >
            <IoMdArrowBack />
            <IoArrowBackSharp className="text-2xl mr-1" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Form Content */}
          <div className="">
            <StateForm data={editData} onClose={handleFormClose} />
          </div>
        </div>
      ) : (
        <>
          {/* Use Wave with custom width */}
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
                <p className="text-gray-700">
                  Stats data exists and can be edited or deleted.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
