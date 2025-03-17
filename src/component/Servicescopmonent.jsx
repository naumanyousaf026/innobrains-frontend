import React, { useEffect, useState } from "react";
import "../App.css";

const ServicesSection = ({ limit }) => {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/service");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const displayedServices =
    limit && !showAll ? services.slice(0, limit) : services;

  return (
    <div className="px-4 py-12 md:px-12 lg:px-[44px]">
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 flex-wrap">
        {displayedServices.map((service) => (
          <div
            key={service._id}
            className="bg-[#103153] text-white p-6 rounded-3xl w-full md:w-[48%] lg:w-[28%]"
          >
            <div className="flex mb-4">
              <div className="p-4 rounded">
                <img
                  src={`https://apis.innobrains.pk/ServiceImage/${service.image}`}
                  alt={service.name}
                  className="w-20 h-20 rounded-md"
                />
              </div>
            </div>
            <h2 className="text-lg md:text-4xl font-semibold mb-4 poppins-thin">
              {service.name}
            </h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base poppins-thin">
              {service.description}
            </p>
            <button className="border-[#F8AF2A] poppins-thin border text-[#F8AF2A] py-2 px-4 rounded-full hover:bg-[#F8AF2A] hover:text-white transition duration-300">
              Contact Us
            </button>
          </div>
        ))}
      </div>
      {limit && services.length > limit && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 poppins-thin mt-11 bg-[#F8AF2A] text-white rounded-full hover:bg-yellow-600 transition duration-300"
          >
            {showAll ? "Show Less Services" : "See All Services"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
