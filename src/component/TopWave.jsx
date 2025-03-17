import React, { useEffect, useState } from "react";
import axios from "axios";

const TopWave = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1440 671"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M491.542 55.3699C325.738 111.813 105.438 30.2567 0 10.0311V630.204C61.5431 664.07 213.932 658.228 324.348 644.117C522.038 630.975 621.136 566.038 930.366 623.09C1184.86 682.92 1338.41 675.359 1444 660.543V39.664C1316.57 79.1743 1152.79 114.507 944.424 55.3699C634.637 -48.4496 598.79 18.8598 491.542 55.3699Z"
        fill="#CFE7FF"
      />
    </svg>
  );
};

const BottomWave = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1440 671"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M489.5 55.3699C324.385 111.813 105 30.2567 0 10.0311V630.204C61.2874 664.07 213.043 658.228 323 644.117C519.869 630.975 618.555 566.038 926.5 623.09C1179.94 682.92 1332.85 675.359 1444 660.543V39.664C1311.1 79.1743 1148 114.507 940.5 55.3699C632 -48.4496 596.302 18.8598 489.5 55.3699Z"
        fill="#103153"
      />
    </svg>
  );
};

function Wave() {
  const [satisfactionData, setSatisfactionData] = useState([]);

  // Fetch data from backend API
  useEffect(() => {
    const fetchSatisfactionData = async () => {
      try {
        const response = await axios.get("https://apis.innobrains.pk/api/satisfie");
        setSatisfactionData(response.data);
      } catch (error) {
        console.error("Error fetching satisfaction data", error);
      }
    };
    fetchSatisfactionData();
  }, []);

  return (
    <div className="relative w-full" style={{ height: "auto" }}>
      {/* Top Wave */}
      <div className="relative w-full h-[200px] md:h-[300px] lg:h-[500px]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <TopWave />
        </div>
      </div>

      {/* Text content - Top Section */}
      <div className="absolute -top-[150px] lg:-top-[210px] left-0 max-w-7xl h-full flex flex-col justify-center items-center z-10 p-8">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              We Provide A Wide Range Of Services
            </h2>
            <p className="text-sm md:text-lg">
              We strive for creative and manufacturing synergy, utilizing each
              team member’s individual skills and own unique perspective on
              design, collaborating to achieve exceptional results.
            </p>
            <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md text-sm md:text-base lg:text-lg">
              Contact Us
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  800
                </h3>
                <p className="mt-2 text-gray-600 text-sm lg:text-lg">
                  Loyal Clients
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  30
                </h3>
                <p className="mt-2 text-gray-600 text-sm lg:text-lg">Experts</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  5
                </h3>
                <p className="mt-2 text-gray-600 text-sm lg:text-lg">
                  Years Of Experience
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  5
                </h3>
                <p className="mt-2 text-gray-600 text-sm lg:text-lg">
                  Tech Awards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="relative w-full h-[200px] md:h-[300px] lg:h-[500px] -mt-[91px]">
        <div className="absolute left-0 w-full h-full overflow-hidden">
          <BottomWave />
        </div>
      </div>

      {/* Text content - Bottom Section */}
      <div className="absolute -top-[-180px] lg:-top-[-210px] left-0 w-full h-full flex flex-col justify-center items-center z-10 text-center p-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Our Satisfied Customers
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 text-center text-white">
          {satisfactionData.map((entry) => (
            <div key={entry._id}>
              <p className="italic text-sm md:text-lg">"{entry.description}"</p>
              <p className="mt-6 font-bold text-base md:text-lg lg:text-xl">
                {entry.customerName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wave;
