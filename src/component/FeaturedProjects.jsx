import React, { useEffect, useState } from "react";

const FeaturedProjects = () => {
  // Initial state with dummy data for fallback
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "Softwares", "School Management"];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://apis.innobrains.pk/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        // Ensure data has consistent structure
        const formattedData = data.map(project => ({
          _id: project._id || Math.random().toString(),
          title: project.title || "Untitled Project",
          category: project.category || "Uncategorized",
          image: project.image || "/api/placeholder/200/150", // Fallback image
          style: project.style || "white"
        }));
        setProjects(formattedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by active category
  const filteredProjects = activeCategory === "ALL" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

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

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left Menu Section */}
          <div className="relative w-full md:w-1/4 mb-6 md:mb-0">
            <div className="absolute left-1 top-2 h-[70px] border-l-2 border-dashed border-gray-400"></div>
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setActiveCategory(category)}
                >
                  <span
                    className={`w-2 h-2 rounded-full absolute left-0 ${
                      category === activeCategory ? "bg-[#103153]" : "bg-gray-500"
                    }`}
                  ></span>
                  <span
                    className={`ml-4 font-bold ${
                      category === activeCategory ? "text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-3/4">
            {loading ? (
              // Loading state
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="rounded-2xl shadow-lg border border-gray-200 bg-white h-96 animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-2 text-center py-10">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProjects.length > 0 ? (
              // Projects display
              filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl flex flex-col h-96"
                >
                  {/* Project Image Section */}
                  <div
                    className={`w-full flex rounded-t-2xl items-center justify-center h-64 ${
                      project.style === "black-img-white-text" ? "bg-black" : "bg-white"
                    }`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-44 h-32 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/200/150";
                        }}
                      />
                    ) : (
                      <div className="w-44 h-32 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  {/* Text Section */}
                  <div className="w-full p-4 bg-white rounded-b-2xl flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {project.category || "Uncategorized"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Empty state
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-600">No projects available for {activeCategory}.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProjects;