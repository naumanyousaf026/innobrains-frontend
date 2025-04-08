import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const CompanyValues = () => {
  const [valuesData, setValuesData] = useState({
    headline: "",
    sections: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const icons = [faUsers, faUserCircle, faCodepen];

  useEffect(() => {
    const fetchCompanyValues = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/company-values");
        
        if (!response.ok) {
          throw new Error("Failed to fetch company values");
        }
        
        const data = await response.json();
        setValuesData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompanyValues();
  }, []);

  if (loading) {
    return <div className="py-12 text-center">Loading company values...</div>;
  }

  if (error) {
    return <div className="py-12 text-center">Error loading company values: {error}</div>;
  }

  return (
    <div className="">
      <div className="py-12 text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-6 poppins-thin max-w-3xl mx-auto">
          {valuesData.headline}
        </h2>
        <p className="text-lg md:text-xl text-[#5C5C5C] mb-12 poppins-thin leading-relaxed max-w-2xl mx-auto">
          We believe in empowering businesses with innovation, fostering
          collaboration, and delivering results that matter.
        </p>

        {/* Values Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 ">
          {valuesData.sections && valuesData.sections.map((section, index) => (
            <div className="max-w-xs w-full text-center" key={section._id || index}>
              <div className="mb-4">
                <FontAwesomeIcon
                  icon={icons[index % icons.length]}
                  className="text-3xl text-[#103153]"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 roboto-thin">
                {section.title}
              </h3>
              <p className="text-gray-500 roboto-thin">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyValues;