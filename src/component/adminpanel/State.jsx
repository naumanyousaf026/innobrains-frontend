import React, { useState } from "react";
import Wave from "../TopWave"; // make sure path is correct

export default function StatePreview() {
  const [showData, setShowData] = useState(true);

  const handleDelete = () => {
    setShowData(false);
  };

  const handleAdd = () => {
    setShowData(true);
  };

  return (
    <div>
      {showData ? (
        <>
          <Wave />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow-md transition duration-300"
            >
              Delete
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
