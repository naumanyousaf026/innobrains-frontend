import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDribbble, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/team"); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        // Map the data to include the images, setting a proper image path
        const membersWithImages = data.map((member) => ({
          ...member,
          image: `https://apis.innobrains.pk/TeamImages/${
            member.image || "defaultImage.png"
          }`, // Ensure the path points to the correct image folder
        }));
        setTeamMembers(membersWithImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section className="bg-gray-100 py-12 w-5/6 mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h3 className="text-lg text-gray-500">Team Members</h3>
        <h2 className="text-4xl font-bold text-gray-800">
          See Our Skilled Expert Team
        </h2>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare.
        </p>
      </div>

      {/* Grid of Team Members */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {teamMembers.map((member) => (
          <div
            key={member._id} // Use _id instead of index for uniqueness
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              className="w-full h-64 object-cover"
              src={member.image}
              alt={member.name}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="mt-4 text-gray-600">{member.description}</p>
            </div>
            <div className="flex space-x-4 py-3">
              <a
                href="#"
                aria-label={`${member.name} LinkedIn`}
                className="text-gray-600 hover:text-gray-800 ms-4"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
              </a>

              <a
                href="#"
                aria-label={`${member.name} Dribbble`}
                className="text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon icon={faDribbble} className="text-xl" />
              </a>

              <a
                href="#"
                aria-label={`${member.name} More`}
                className="text-gray-600 hover:text-gray-800"
              >
                <FontAwesomeIcon icon={faX} className="text-xl" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
