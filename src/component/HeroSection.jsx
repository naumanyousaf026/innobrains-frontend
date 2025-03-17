import React from "react";
import headerimg from "../images/headerimage.jpeg";
import faLineChart from "../images/faLineChart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[#F9FAFB] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text and Button Section */}
          <div className="flex-1 md:pr-8 mb-8 md:mb-0 md:ml-12 flex flex-col items-start">
            <h1 className="poppins-thin text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              We Provide the{" "}
              <span className="text-[#103153]">Best Services</span> for Your
              Business
            </h1>
            <p className="text-gray-600 mb-6 text-base md:text-lg lg:text-xl poppins-thin leading-6">
              With over 15 years of experience, we offer expert consulting
              services and innovative business solutions.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="block bg-[#F8AF2A] text-white px-3 py-2 rounded-full w-full mt-5 text-center text-base font-semibold"
              >
                Contact us
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative">
            <img
              src={headerimg}
              alt="Header"
              className="w-full h-auto max-h-[600px] object-cover rounded-lg"
            />
            <img
              src={faLineChart}
              alt="Line Chart"
              className="absolute bottom-[-40px] left-1/2 transform -translate-x-[165%]  md:w-52 lg:min-w-80 h-auto object-cover rounded-lg z-10"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="absolute bottom-4 md:bottom-8 text-white font-semibold text-sm md:text-lg lg:text-xl flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="bg-yellow-400 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-20">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="text-lg md:text-xl text-white"
                    />
                  </div>
                  <div className="absolute inset-0 bg-yellow-400 opacity-50 rounded-full blur-md sm:blur-lg"></div>
                </div>
                <div className="mt-2">
                  {" "}
                  {/* Margin-top for spacing */}
                  Watch Our Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
