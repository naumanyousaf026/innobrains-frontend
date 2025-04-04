import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDribbble, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/team");
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        const membersWithImages = data.map((member) => ({
          ...member,
          image: `https://apis.innobrains.pk/TeamImages/${member.image || 'defaultImage.png'}`,
          social: {
            linkedin: member.linkedin || 'https://linkedin.com',
            dribbble: member.dribbble || 'https://dribbble.com',
          },
        }));
        setTeamMembers(membersWithImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleMoreInfoClick = (member) => {
    console.log('More info about:', member);
  };

  return (
    <section className="bg-[#F9FAFB] py-12 w-5/6 mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h3 className="text-lg text-[#5C5C5C] font-semibold mb-3">Team Members</h3>
        <h2 className="text-4xl font-bold text-gray-800">Meet Our Skilled Team</h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Our success comes from a skilled, passionate team excelling in technology, design, and strategy. At Innobrains Technologies, we don’t just create solutions—we build lasting relationships for long-term client success.
        </p>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member._id || member.id}
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            {/* Image Section - full height display */}
            <div className="w-full h-72 overflow-hidden">
              <img
                className="w-full h-full object-contain object-top"
                src={member.image}
                alt={member.name}
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#101010]">{member.name}</h3>
              <p className="text-[#5C5C5C]">{member.role}</p>
              <p className="mt-4 text-[#5C5C5C]">{member.description}</p>
            </div>

            {/* Social Icons - always show */}
            <div className="flex px-6 space-x-4 pb-4">
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="text-gray-950 hover:text-gray-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
              </a>
              <a
                href={member.social.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} Dribbble`}
                className="text-gray-950 hover:text-gray-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faDribbble} className="text-xl" />
              </a>
              <button
                onClick={() => handleMoreInfoClick(member)}
                aria-label={`${member.name} More Info`}
                className="text-gray-950 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faX} className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
