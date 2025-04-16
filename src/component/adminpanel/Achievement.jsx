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
        </>
      )}
    </div>
  );
};

export default Achievement;