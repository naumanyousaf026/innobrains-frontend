import React, { useState } from "react";
import TechSolutionsSection from "../aboutus/TechSection";
import AboutForm from "./AboutForm";

const TechSolutionsManager = () => {
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
          {showForm ? "Edit About Info" : "About Section"}
        </h1>
        <button
          onClick={handleToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Show About Section" : "Edit About Info"}
        </button>
      </div>

      {showForm ? (
        <AboutForm onClose={handleFormClose} />
      ) : (
        <TechSolutionsSection widthClass="w-[80%] ml-auto" />
      )}
    </div>
  );
};

export default TechSolutionsManager;
