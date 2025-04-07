import React, { useState, useEffect } from "react";

const TechSolutionsSection = () => {
  // State to hold the fetched data
  const [data, setData] = useState(null);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch("https://apis.innobrains.pk/api/aboutus")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Loading state
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="">
      <div className="w-5/6 mx-auto py-16">
        {/* Main Title Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mx-8">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-[#5C5C5C] mt-4">
            {data.description}
          </p>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col md:flex-row mt-14 justify-between">
          {/* Left Side (Heading & Story) */}
          <div className="ms-20">
            <h2 className="text-3xl md:text-xl font-bold">{data.aboutTitle}</h2>
            <h3 className="text-2xl md:text-4xl font-semibold mt-2">
              Our Story
            </h3>
          </div>

          {/* Right Side (Paragraph) */}
          <div className="md:w-[65%]">
            <p className="text-[#5C5C5C] mt-4 leading-relaxed">
              {data.aboutDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSolutionsSection;
