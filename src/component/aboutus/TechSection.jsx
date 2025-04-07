import React, { useState, useEffect } from "react";
import axios from "axios";

const TechSolutionsSection = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    aboutTitle: "",
    aboutDescription: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("https://apis.innobrains.pk/api/aboutus");
        // Use the first item in the array from the API response
        if (response.data && response.data.length > 0) {
          setAboutData(response.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching about us data:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section className="">
        <div className="w-5/6 mx-auto py-16 text-center">
          <p>Loading content...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="">
        <div className="w-5/6 mx-auto py-16 text-center">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="w-5/6 mx-auto py-16">
        {/* Main Title Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mx-8">
            {aboutData.title.split("Tech Solutions")[0]}
            <span className="text-[#103153]"> Tech Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-[#5C5C5C] mt-4">
            {aboutData.description}
          </p>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col md:flex-row mt-14 justify-between">
          {/* Left Side (Heading & Story) */}
          <div className="ms-20">
            <h2 className="text-3xl md:text-xl font-bold">{aboutData.aboutTitle}</h2>
            <h3 className="text-2xl md:text-4xl font-semibold mt-2">
              Our Story
            </h3>
          </div>

          {/* Right Side (Paragraph) */}
          <div className="md:w-[65%]">
            <p className="text-[#5C5C5C] mt-4 leading-relaxed">
              {aboutData.aboutDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSolutionsSection;