import React, { useState } from "react";

function AchievementForm() {
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
          [name]: Number(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Achievement added successfully!");
    setFormData({
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
  };

  return (
    <div className="flex  items-center justify-center min-h-screen lg:w-[80%] ml-auto p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2">Achievement</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="projectsCompleted"
              >
                Projects Completed
              </label>
              <input
                type="number"
                id="projectsCompleted"
                name="projectsCompleted"
                value={formData.statistics.projectsCompleted}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="yearOnYearGrowth"
              >
                Year-on-Year Growth (%)
              </label>
              <input
                type="number"
                id="yearOnYearGrowth"
                name="yearOnYearGrowth"
                value={formData.statistics.yearOnYearGrowth}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="funded"
              >
                Funded ($)
              </label>
              <input
                type="number"
                id="funded"
                name="funded"
                value={formData.statistics.funded}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="downloads"
              >
                Downloads
              </label>
              <input
                type="number"
                id="downloads"
                name="downloads"
                value={formData.statistics.downloads}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#103153] text-white font-semibold py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AchievementForm;
