import React, { useState } from "react";
import GrowthSteps from "../ourservices/GrowthSteps";
import GrowthStepsForm from "./GrowthStepsForm"; // assume this is your form for add/edit

const GrowthStepsManager = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm ? "Edit Growth Steps" : "Growth Steps"}
        </h1>
        <button
          onClick={handleToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Show Growth Steps" : "Edit Growth Steps"}
        </button>
      </div>

      {showForm ? (
        <GrowthStepsForm onClose={handleFormClose} />
      ) : (
        <GrowthSteps />
      )}
    </div>
  );
};

export default GrowthStepsManager;