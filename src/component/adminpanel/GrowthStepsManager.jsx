import React, { useState } from "react";
import GrowthSteps from "../ourservices/GrowthSteps";
import GrowthStepForm from "./StepForm";

const GrowthStepsManager = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      {!showForm && (
        <>
          <GrowthSteps />
          <div className="mt-4 text-center">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleShowForm}
            >
              Add Growth Step
            </button>
          </div>
        </>
      )}

      {showForm && <GrowthStepForm onClose={handleCloseForm} />}
    </div>
  );
};

export default GrowthStepsManager;

