import React, { useEffect, useState } from "react";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AchievementForm from "./AchievementForm";
import Achievements from "../aboutus/Achievements";

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAchievement, setEditAchievement] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch("https://apis.innobrains.pk/api/achievements");
      const data = await res.json();
      setAchievements(data);
    } catch (err) {
      console.error("Error fetching achievements:", err);
    }
  };

  const handleEdit = (achievement) => {
    setEditAchievement(achievement);
    setShowForm(true);
  };

  const handleAddNew = () => {
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
            onClick={handleAddNew}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New
          </button>
        )}
      </div>

      {showForm ? (
        <AchievementForm achievement={editAchievement} onClose={handleFormClose} />
      ) : (
        <Achievements onEdit={handleEdit} data={achievements} />
      )}
    </div>
  );
};

export default Achievement;
