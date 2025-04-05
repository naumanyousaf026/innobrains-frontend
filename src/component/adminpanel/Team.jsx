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
  const [currentMember, setCurrentMember] = useState(null); // To store the member being edited

  // Fetching team data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://apis.innobrains.pk/api/team");
        setData(response.data); // Assuming the response is an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addMember = (newMember) => {
    setData((prev) => [...prev, newMember]);
    setShowForm(false);
  };

  const updateMember = async (updatedMember) => {
    try {
      await axios.put(
        `https://apis.innobrains.pk/api/team/${updatedMember._id}`,
        updatedMember
      );
      setData((prev) =>
        prev.map((member) =>
          member._id === updatedMember._id ? updatedMember : member
        )
      );
      setShowForm(false);
      setCurrentMember(null); // Clear current member
    } catch (err) {
      console.error("Error updating member:", err);
    }
  };

  const handleEdit = (index) => {
    setCurrentMember(data[index]);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`https://apis.innobrains.pk/api/team/${data[index]._id}`); // Assuming your data has _id
      setData((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting member:", err);
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
          onUpdateMember={updateMember} // Pass update function to form
          member={currentMember} // Pass current member to form for editing
          onCancel={() => {
            setShowForm(false);
            setCurrentMember(null); // Clear current member
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
                alt={person.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {person.name}
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
                  aria-label={`Edit ${person.name}`}
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
                  aria-label={`Delete ${person.name}`}
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
