import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import AchievementForm from "./AchievementForm";
import Achievements from "../aboutus/Achievements";

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const achievementsPerPage = 9;
  const [showForm, setShowForm] = useState(false);
  const [editAchievement, setEditAchievement] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch("https://apis.innobrains.pk/api/achievement");
      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const handleDelete = async (achievementId) => {
    try {
      const response = await fetch(
        `https://apis.innobrains.pk/api/achievement/${achievementId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAchievements((prevAchievements) =>
          prevAchievements.filter((achievement) => achievement._id !== achievementId)
        );
      } else {
        throw new Error("Failed to delete achievement");
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  const indexOfLastAchievement = currentPage * achievementsPerPage;
  const indexOfFirstAchievement = indexOfLastAchievement - achievementsPerPage;
  const currentAchievements = achievements.slice(
    indexOfFirstAchievement,
    indexOfLastAchievement
  );
  const totalPages = Math.ceil(achievements.length / achievementsPerPage);

  const handleEdit = (achievement) => {
    setEditAchievement(achievement);
    setShowForm(true);
  };

  const handleAddNewAchievement = () => {
    setEditAchievement(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchAchievements();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm
            ? editAchievement
              ? "Edit Achievement"
              : "Add New Achievement"
            : "Achievements"}
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNewAchievement}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Achievement
          </button>
        )}
      </div>

      {showForm ? (
        <AchievementForm achievement={editAchievement} onClose={handleFormClose} />
      ) : (
        <>

        <Achievements />
          <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="border-b-1">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2 hidden md:table-cell">Description</th>
                    <th className="px-4 py-2">Statistics</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAchievements.map((achievement) => (
                    <tr key={achievement._id} className="border-t">
                      <td className="px-4 py-2">{achievement.title}</td>
                      <td className="px-4 py-2 hidden md:table-cell">
                        {achievement.description}
                      </td>
                      <td className="px-4 py-2">
                        <div className="space-y-1">
                          <div>Projects: {achievement.statistics.projectsCompleted}</div>
                          <div>Growth: {achievement.statistics.yearOnYearGrowth}%</div>
                          <div>Funded: ${achievement.statistics.funded}</div>
                          <div>Downloads: {achievement.statistics.downloads}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(achievement.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(achievement)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(achievement._id)}
                          className="text-red-500 hover:text-red-600"
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

          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {indexOfFirstAchievement + 1}-{" "}
              {Math.min(indexOfLastAchievement, achievements.length)} of{" "}
              {achievements.length}
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
        </>
      )}
    </div>
  );
};

export default Achievement;