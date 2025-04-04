import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CompanyValues = () => {
  return (
    <div className="bg-[#F9FAFB]">
      <div className="py-12 text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-6 poppins-thin max-w-3xl mx-auto">
          Emphasize what's important to your company
        </h2>
        <p className="text-lg md:text-xl text-[#5C5C5C] mb-12 poppins-thin leading-relaxed max-w-2xl mx-auto">
          We believe in empowering businesses with innovation, fostering
          collaboration, and delivering results that matter.
        </p>

        {/* Values Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 ">
          {/* Value 1 */}
          <div className="max-w-xs w-full text-center">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-3xl text-[#103153]"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 roboto-thin">
            Digital Innovation
            </h3>
            <p className="text-gray-500 roboto-thin">
            We bring fresh, forward-thinking ideas to every project, helping businesses stay ahead in the digital world.
            </p>
          </div>

          {/* Value 2 */}
          <div className="max-w-xs w-full text-center">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-3xl text-[#103153]"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 roboto-thin">
            Creative Excellence
            </h3>
            <p className="text-gray-500 roboto-thin">
            From design to development, our work is driven by precision and a commitment to delivering top-tier results.
            </p>
          </div>

          {/* Value 3 */}
          <div className="max-w-xs w-full text-center">
            <div className="mb-4">
              <FontAwesomeIcon
                icon={faCodepen}
                className="text-3xl text-[#103153]"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 roboto-thin">
            Powerful Solutions
            </h3>
            <p className="text-gray-500 roboto-thin">
            We prioritize your goals, ensuring every solution we craft is aligned with your business success and satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyValues;
