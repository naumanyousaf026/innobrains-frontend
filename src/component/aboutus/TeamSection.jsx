import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDribbble, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
// Import a fallback image in case API images fail to load
import placeholderImage from '../../images/placeholder.png';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://apis.innobrains.pk/api/team");
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data = await response.json();
        
        // Format the data to match your desired structure
        const membersWithImages = data.map((member) => ({
          ...member,
          id: member._id || member.id, // Support both MongoDB _id and standard id
          image: member.image 
            ? `https://apis.innobrains.pk/TeamImages/${member.image}` 
            : placeholderImage,
          social: {
            linkedin: member.linkedin || 'https://linkedin.com',
            dribbble: member.dribbble || 'https://dribbble.com',
          },
          description: member.description || 'Team member at Innobrains Technologies',
          role: member.role || 'Team Member'
        }));
        
        setTeamMembers(membersWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleMoreInfoClick = (member) => {
    console.log('More info about:', member);
    // You can implement additional functionality here, like opening a modal
  };

  // Display loading state
  if (isLoading) {
    return (
      <section className="bg-[#F9FAFB] py-12 w-5/6 mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Loading Team Members...</h2>
        </div>
      </section>
    );
  }

  // Display error state
  if (error) {
    return (
      <section className="bg-[#F9FAFB] py-12 w-5/6 mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error loading team members</h2>
          <p className="text-gray-600 mt-4">Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F9FAFB] py-12 w-5/6 mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h3 className="text-lg text-[#5C5C5C] font-semibold mb-3">Team Members</h3>
        <h2 className="text-4xl font-bold text-gray-800">Meet Our Skilled Team</h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Our success comes from a skilled, passionate team excelling in technology, design, and strategy. At Innobrains Technologies, we don't just create solutions—we build lasting relationships for long-term client success.
        </p>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            {/* Image Container */}
            <div 
              className="w-full overflow-hidden flex items-center justify-center"
              style={{ height: '369px' }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-contain" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
              />
            </div>

            {/* Member Info */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#101010]">{member.name}</h3>
              <p className="text-[#5C5C5C]">{member.role}</p>
              <p className="mt-4 text-[#5C5C5C]">{member.description}</p>
            </div>

            {/* Social Links */}
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