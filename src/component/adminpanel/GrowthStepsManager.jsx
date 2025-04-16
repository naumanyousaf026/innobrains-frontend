import React, { useState, useEffect } from "react";
import GrowthStepForm from "./StepForm";

const GrowthStepsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    // Fetch existing steps from API
    const fetchSteps = async () => {
      try {
        const res = await fetch("https://apis.innobrains.pk/api/growthsteps");
        const data = await res.json();
        setSteps(data);
      } catch (err) {
        console.error("Failed to fetch steps:", err);
      }
    };
    fetchSteps();
  }, []);

  const handleAddClick = () => {
    setSelectedStep(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (step) => {
    setSelectedStep(step);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    // Optionally, re-fetch updated steps here
  };

  return (
    <div className="p-6">
      {!isFormOpen && (
        <>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddClick}
          >
            Add New Step
          </button>

          <div className="mt-6 space-y-4">
            {steps.map((step) => (
              <div
                key={step._id}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    Step {step.number}: {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleEditClick(step)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {isFormOpen && (

    <GrowthStepForm step={selectedStep} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default GrowthStepsManager;
