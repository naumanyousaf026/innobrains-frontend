import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import GrowthStepForm from "./GrowthStepForm";

const GrowthStep = () => {
  const [growthSteps, setGrowthSteps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stepsPerPage = 9;
  const [showForm, setShowForm] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrowthSteps();
  }, []);

  const fetchGrowthSteps = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://apis.innobrains.pk/api/growthsteps");
      if (!response.ok) {
        throw new Error("Failed to fetch growth steps");
      }
      const data = await response.json();
      setGrowthSteps(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching growth steps:", error);
      setError("Failed to load growth steps. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stepId) => {
    if (!window.confirm("Are you sure you want to delete this step?")) return;
    
    try {
      const response = await fetch(
        `https://apis.innobrains.pk/api/growthsteps/${stepId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setGrowthSteps((prevSteps) =>
          prevSteps.filter((step) => step._id !== stepId)
        );
      } else {
        throw new Error("Failed to delete growth step");
      }
    } catch (error) {
      console.error("Error deleting growth step:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleEdit = (step) => {
    setEditStep(step);
    setShowForm(true);
  };

  const handleAddNewStep = () => {
    setEditStep(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditStep(null);
    fetchGrowthSteps(); // Refresh data after form closes
  };

  // Pagination calculations
  const indexOfLastStep = currentPage * stepsPerPage;
  const indexOfFirstStep = indexOfLastStep - stepsPerPage;
  const currentSteps = growthSteps.slice(indexOfFirstStep, indexOfLastStep);
  const totalPages = Math.ceil(growthSteps.length / stepsPerPage);

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm
            ? editStep
              ? "Edit Growth Step"
              : "Add New Growth Step"
            : "Growth Steps"}
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNewStep}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Growth Step
          </button>
        )}
      </div>

      {showForm ? (
        <GrowthStepForm step={editStep} onClose={handleFormClose} />
      ) : (
        <>
          {loading ? (
            <div className="text-center py-10">Loading growth steps...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <>
              <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-left">
                    <thead className="border-b-1">
                      <tr>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Step Number</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2 hidden md:table-cell">Description</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSteps.map((step) => (
                        <tr key={step._id} className="border-t">
                          <td className="px-4 py-2">
                            <img
                              src={`https://apis.innobrains.pk/GrowthStepImage/${step.image}`}
                              alt={step.title}
                              className="w-16 h-16 rounded-md object-cover"
                              onError={(e) => {
                                e.target.src = "/images/default-image.jpg"; // Handle image error
                              }}
                            />
                          </td>
                          <td className="px-4 py-2">{step.number}</td>
                          <td className="px-4 py-2">{step.title}</td>
                          <td className="px-4 py-2 hidden md:table-cell">
                            {step.description}
                          </td>
                          <td className="px-4 py-2 flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(step)}
                              className="text-yellow-500 hover:text-yellow-600"
                              title="Edit"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => handleDelete(step._id)}
                              className="text-red-500 hover:text-red-600"
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {growthSteps.length > 0 ? (
                <div className="flex justify-between items-center mt-4">
                  <span>
                    Showing {indexOfFirstStep + 1}-{" "}
                    {Math.min(indexOfLastStep, growthSteps.length)} of{" "}
                    {growthSteps.length}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded ${
                            currentPage === page
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-300"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">No growth steps found. Add your first one!</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GrowthStep;