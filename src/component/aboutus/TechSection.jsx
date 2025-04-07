import React, { useState, useEffect } from "react";
import axios from "axios";

const TechSolutionsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data with Axios...");
    axios
      .get("https://apis.innobrains.pk/api/aboutus")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log("Data fetched:", response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
