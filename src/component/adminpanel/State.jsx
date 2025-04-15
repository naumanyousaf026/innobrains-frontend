import React, { useEffect, useState } from "react";
import axios from "axios";
import Wave from "../TopWave";

export default function StatePreview({ setSection, setSelectedState }) {
  const [showData, setShowData] = useState(false);
  const [statsId, setStatsId] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://apis.innobrains.pk/api/stats");
        if (res.data.length > 0) {
          setStatsId(res.data[0]._id);
          setStatsData(res.data[0]);
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
    if (!statsId) return;
    try {
      await axios.delete(`https://apis.innobrains.pk/api/stats/${statsId}`);
      setShowData(false);
      setStatsId(null);
      setStatsData(null);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleUpdate = () => {
    setSelectedState(statsData); // pass full state object
    setSection("StateForm");
  };

  const handleAdd = () => {
    setSelectedState(null); // clear previous data
    setSection("StateForm");
  };

  if (loading) {
    return <p className="ml-[150px] text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="ml-[250px] mt-5 px-4">
      {showData ? (
        <>
          <Wave />
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
            >
              Update
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="mb-4 text-lg">
            No data available. Please click{" "}
            <span className="font-semibold">Add</span> to view preview.
          </p>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add State
          </button>
        </div>
      )}
    </div>
  );
}
