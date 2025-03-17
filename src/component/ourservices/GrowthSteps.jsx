import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GrowthSteps = () => {
  const [steps, setSteps] = useState([]);

  // Fetch steps from the backend API
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/growthsteps"); // Update the URL to match your API
        const data = await response.json();
        // Map the data to include the images
        const stepsWithImages = data.map((step) => ({
          ...step,
          image: step.image
            ? `https://apis.innobrains.pk/growthImage/${step.image}`
            : "https://apis.innobrains.pk/growthImage/handpointer.png", // Fallback image URL
        }));
        setSteps(stepsWithImages);
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    };

    fetchSteps();
  }, []);

  return (
    <section className="bg-[#F9FAFB] py-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h3 className="text-gray-500 uppercase poppins-thin font-semibold tracking-wide mb-8 poppins-thin">
          Process
        </h3>
        <h2 className="text-6xl font-bold mb-36">
          Unlock <span className="text-yellow-500 poppins-thin">growth</span> in
          3 simple steps
        </h2>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[76rem] mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        {steps.map((step) => (
          <div
            key={step._id}
            className="bg-[#D5E2EF] max-w-md p-8 shadow-md rounded-3xl text-center relative mx-auto"
          >
            <div className="absolute -top-[4.5rem] left-1/2 transform -translate-x-1/2 bg-[#F8AF2A] w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold poppins-thin p-16">
              {step.number < 10 ? `0${step.number}` : step.number}
            </div>
            <div className="mt-10">
              <img
                src={step.image} // Directly use the image URL
                alt={`Step ${step.number} icon`}
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="text-lg font-semibold mb-2 poppins-thin">
                {step.title}
              </h3>
              <p className="text-lg poppins-thin my-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Button */}
      <div className="text-center mt-8">
        <Link to="/contact">
          <button className="bg-[#F8AF2A] poppins-thin py-2 px-10 rounded-full text-lg hover:bg-yellow-600 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GrowthSteps;
