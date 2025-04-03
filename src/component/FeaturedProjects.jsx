import React, { useEffect, useState } from "react";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-8 md:p-12 lg:p-16 bg-[#DDEEFF]">
      <section className="container max-w-7xl mx-auto px-4 lg:px-[70px] flex flex-col items-start">
        {/* Header Section */}
        <div className="flex justify-between items-center w-full mb-6">
          <h3 className="flex items-center text-sm font-semibold uppercase tracking-wide text-[#103153]">
            <span className="w-2 h-2 bg-[#103153] rounded-full mr-2"></span> FEATURED PROJECTS
          </h3>
          <button className="bg-[#F8AF2A] text-white px-6 py-2 rounded-lg">
            See All Projects
          </button>
        </div>

        {/* Title Section */}
        <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold text-gray-900 mb-8 max-w-md leading-tight">
          Take A Look At <span className="text-[#103153]">Some Of Our Work</span>
        </h2>

        {/* Error Handling */}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left Menu Section */}
          <div className="relative w-1/4">
            <div className="absolute left-1 top-2 h-[70px] border-l-2 border-dashed border-gray-400"></div>
            <ul className="space-y-4">
              {["ALL", "Softwares", "School Management"].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full absolute left-0 ${
                      index === 0 ? "bg-[#103153]" : "bg-gray-500"
                    }`}
                  ></span>
                  <span
                    className={`ml-4 font-bold ${
                      index === 0 ? "text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-3/4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className={`rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl flex flex-col items-center justify-center ${
                    project.style === "white"
                      ? "bg-white text-black"
                      : "bg-white text-black border border-gray-300"
                  }`}
                >
                  {/* Project Image Section */}
                  <div
                    className={`w-full flex rounded-2xl items-center justify-center h-64 ${
                      project.style === "black-img-white-text" ? "bg-black" : "bg-white"
                    }`}
                  >
                    <img
                      src={project.image}
                      alt="Project Preview"
                      className="w-44 h-32 object-contain"
                    />
                  </div>
                  {/* Text Section */}
                  <div className="w-full rounded-2xl p-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No projects available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProjects;
