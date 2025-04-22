import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const API_URL = "https://apis.innobrains.pk/api/achievements";

  // Fetch all achievements on component mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Function to fetch all achievements
  const fetchAchievements = async () => {
    try {
      const response = await axios.get(API_URL);
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Update existing achievement
        await axios.patch(`${API_URL}/${currentId}`, formData);
      } else {
        // Create new achievement
        await axios.post(API_URL, formData);
      }
      
      // Reset form
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
      
      // Clear editing state
      setIsEditing(false);
      setCurrentId(null);
      
      // Fetch updated achievements
      fetchAchievements();
      
      // Show success message
      alert(isEditing ? "Achievement updated successfully!" : "Achievement added successfully!");
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert("An error occurred while saving the achievement.");
    }
  };

  const handleEdit = (achievement) => {
    setIsEditing(true);
    setCurrentId(achievement._id);
    
    // Format date for input field (YYYY-MM-DD)
    const formattedDate = achievement.date ? 
      new Date(achievement.date).toISOString().split('T')[0] : 
      "";
    
    setFormData({
      title: achievement.title,
      description: achievement.description,
      statistics: {
        projectsCompleted: achievement.statistics?.projectsCompleted || "",
        yearOnYearGrowth: achievement.statistics?.yearOnYearGrowth || "",
        funded: achievement.statistics?.funded || "",
        downloads: achievement.statistics?.downloads || "",
      },
      date: formattedDate,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAchievements();
        alert("Achievement deleted successfully!");
      } catch (error) {
        console.error("Error deleting achievement:", error);
        alert("An error occurred while deleting the achievement.");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentId(null);
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
    <div className="flex items-center justify-center min-h-screen w-full p-6">
      <div className="w-full bg-white rounded-lg shadow-xl p-8">
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

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-[#103153] text-white font-semibold py-2 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Display Achievements */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Saved Achievements</h3>
          
          {achievements.length === 0 ? (
            <p className="text-gray-500">No achievements found.</p>
          ) : (
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement._id} 
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between">
                    <h4 className="font-bold text-lg">{achievement.title}</h4>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(achievement)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(achievement._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-1">{achievement.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm">
                      <span className="font-medium">Projects:</span> {achievement.statistics?.projectsCompleted}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Growth:</span> {achievement.statistics?.yearOnYearGrowth}%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Funded:</span> ${achievement.statistics?.funded}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Downloads:</span> {achievement.statistics?.downloads}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-2">
                    {achievement.date 
                      ? new Date(achievement.date).toLocaleDateString() 
                      : "No date specified"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AchievementForm;