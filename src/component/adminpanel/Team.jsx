import React, { useState, useEffect } from "react";
import MemberForm from "./MemberForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Team = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);

  // Fetching team data from API
  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://apis.innobrains.pk/api/team");
      setData(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching team data:", err);
    } finally {
      setLoading(false);
    }
  };

  const addMember = (newMember) => {
    setData((prev) => [...prev, newMember]);
    setShowForm(false);
  };

  const updateMember = (updatedMember) => {
    setData((prev) =>
      prev.map((member) =>
        member._id === updatedMember._id ? updatedMember : member
      )
    );
    setShowForm(false);
    setCurrentMember(null);
  };

  const handleEdit = (index) => {
    setCurrentMember(data[index]);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`https://apis.innobrains.pk/api/team/${data[index]._id}`);
        setData((prev) => prev.filter((_, i) => i !== index));
      } catch (err) {
        console.error("Error deleting member:", err);
        alert("Failed to delete team member");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          {showForm
            ? currentMember
              ? "Edit Member"
              : "Add New Member"
            : "Team"}
        </h1>
        {!showForm && (
          <button
            onClick={() => {
              setCurrentMember(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition duration-200 hover:bg-blue-700"
          >
            Add New Member
          </button>
        )}
      </div>

      {showForm ? (
        <MemberForm
          onAddMember={addMember}
          onUpdateMember={updateMember}
          member={currentMember}
          onCancel={() => {
            setShowForm(false);
            setCurrentMember(null);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((person, index) => (
            <div
              key={person._id}
              className="bg-white rounded-lg shadow-lg p-6 text-center transition-shadow hover:shadow-xl"
            >
              <img
                src={
                  person.image
                    ? `https://apis.innobrains.pk/TeamImages/${person.image}`
                    : `https://apis.innobrains.pk/TeamImages/defaultImage.png`
                }
                alt={`${person.firstName} ${person.lastName}`}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {person.firstName} {person.lastName}
              </h3>
              <p className="text-[#373a3e] font-semibold mb-2">{person.role}</p>
              <abbr title={person.email} className="border-none">
                <a
                  href={`mailto:${person.email}`}
                  className="block overflow-hidden whitespace-nowrap text-black text-ellipsis"
                  style={{ maxWidth: "150px" }}
                >
                  {person.email}
                </a>
              </abbr>
              <div className="flex justify-center mt-2 space-x-2">
                <button
                  className="flex items-center justify-center px-3"
                  onClick={() => handleEdit(index)}
                  aria-label={`Edit ${person.firstName} ${person.lastName}`}
                >
                  <abbr title="Edit" className="no-underline">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="mr-1 text-yellow-500 rounded-full p-1"
                    />
                  </abbr>
                </button>
                <button
                  className="flex items-center justify-center px-3"
                  onClick={() => handleDelete(index)}
                  aria-label={`Delete ${person.firstName} ${person.lastName}`}
                >
                  <abbr title="Delete">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="mr-1 text-red-500 rounded-full p-1"
                    />
                  </abbr>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;