import React, { useState, useEffect } from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AchievementForm = ({ achievement, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    statistics: {
      projectsCompleted: "",
      yearOnYearGrowth: "",
      funded: "",
      downloads: "",
    },
    date: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (achievement) {
      setFormData({
        title: achievement.title || "",
        description: achievement.description || "",
        statistics: {
          projectsCompleted: achievement.statistics?.projectsCompleted || "",
          yearOnYearGrowth: achievement.statistics?.yearOnYearGrowth || "",
          funded: achievement.statistics?.funded || "",
          downloads: achievement.statistics?.downloads || "",
        },
        date: achievement.date ? achievement.date.split('T')[0] : "",
      });
    }
  }, [achievement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["projectsCompleted", "yearOnYearGrowth", "funded", "downloads"].includes(
        name
      )
    ) {
      setFormData({
        ...formData,
        statistics: {
          ...formData.statistics,
          [name]: value,
        },
      });
      setError((prev) => ({ ...prev, [name]: "" }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!formData.title) newError.title = "Title is required.";
    if (!formData.description) newError.description = "Description is required.";
    if (!formData.date) newError.date = "Date is required.";
    
    // Validate statistics
    if (!formData.statistics.projectsCompleted) 
      newError.projectsCompleted = "Projects completed is required.";
    if (!formData.statistics.yearOnYearGrowth) 
      newError.yearOnYearGrowth = "Year-on-year growth is required.";
    if (!formData.statistics.funded) 
      newError.funded = "Funded amount is required.";
    if (!formData.statistics.downloads) 
      newError.downloads = "Downloads is required.";
    
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const method = achievement ? "PUT" : "POST";
    const url = achievement
      ? `https://apis.innobrains.pk/api/achievement/${achievement._id}`
      : "https://apis.innobrains.pk/api/achievement";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to save achievement");
      }
    } catch (error) {
      console.error("Error saving achievement:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg mx-auto"
    >
      <button
        type="button"
        onClick={onClose}
        className="text-gray-600 hover:text-blue-500 transition duration-200 rounded-lg mb-4"
      >
        <FontAwesomeIcon icon={faLeftLong} />
      </button>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Achievement Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter achievement title"
          className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
            error.title ? "border-red-500" : ""
          }`}
        />
        {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter achievement description"
          rows="5"
          className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
            error.description ? "border-red-500" : ""
          }`}
        />
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Projects Completed
          </label>
          <input
            type="number"
            name="projectsCompleted"
            value={formData.statistics.projectsCompleted}
            onChange={handleChange}
            placeholder="Enter number of projects"
            min="0"
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.projectsCompleted ? "border-red-500" : ""
            }`}
          />
          {error.projectsCompleted && (
            <p className="text-red-500 text-sm">{error.projectsCompleted}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Year-on-Year Growth (%)
          </label>
          <input
            type="number"
            name="yearOnYearGrowth"
            value={formData.statistics.yearOnYearGrowth}
            onChange={handleChange}
            placeholder="Enter growth percentage"
            min="0"
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.yearOnYearGrowth ? "border-red-500" : ""
            }`}
          />
          {error.yearOnYearGrowth && (
            <p className="text-red-500 text-sm">{error.yearOnYearGrowth}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Funded Amount ($)
          </label>
          <input
            type="number"
            name="funded"
            value={formData.statistics.funded}
            onChange={handleChange}
            placeholder="Enter funded amount"
            min="0"
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.funded ? "border-red-500" : ""
            }`}
          />
          {error.funded && (
            <p className="text-red-500 text-sm">{error.funded}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Downloads
          </label>
          <input
            type="number"
            name="downloads"
            value={formData.statistics.downloads}
            onChange={handleChange}
            placeholder="Enter number of downloads"
            min="0"
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.downloads ? "border-red-500" : ""
            }`}
          />
          {error.downloads && (
            <p className="text-red-500 text-sm">{error.downloads}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
            error.date ? "border-red-500" : ""
          }`}
        />
        {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-[#103153] px-5 text-white py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {achievement ? "Update Achievement" : "Add Achievement"}
        </button>
      </div>
    </form>
  );
};

export default AchievementForm;