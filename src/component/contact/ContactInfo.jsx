import React, { useEffect, useState } from "react";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetch("https://apis.innobrains.pk/api/contact-info") // Change the URL as needed
      .then((response) => response.json())
      .then((data) => {
        setContactInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching contact info:", error);
      });
  }, []);

  if (!contactInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-[#F9FAFB] justify-center items-center px-4">
      <div className="max-w-6xl my-24 w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Email Section */}
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-3xl mb-4 text-[#103153]"
            aria-label="Email Icon"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-500 mb-2">
            Our friendly team is here to help.
          </p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-[#103153] font-medium hover:underline transition duration-300"
            aria-label={`Email ${contactInfo.email}`}
          >
            {contactInfo.email}
          </a>
        </div>

        {/* Location Section */}
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-3xl mb-4 text-[#103153]"
            aria-label="Location Icon"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Location</h3>
          <p className="text-gray-500 mb-2">Come say hello at our office.</p>
          <p className="text-[#103153] font-medium">{contactInfo.location}</p>
        </div>

        {/* Phone Section */}
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faPhone}
            className="text-3xl mb-4 text-[#103153]"
            aria-label="Phone Icon"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Phone</h3>
          <p className="text-gray-500 mb-2">{contactInfo.hours}</p>
          <a
            href={`tel:${contactInfo.phone}`}
            className="text-[#103153] font-medium hover:underline transition duration-300"
            aria-label={`Call ${contactInfo.phone}`}
          >
            {contactInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
