import React, { useEffect, useState } from "react";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // For debugging - add this to see the actual structure of API data
  const [rawApiData, setRawApiData] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching data from API...");
        const response = await fetch("https://apis.innobrains.pk/api/product");
        
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        
        const data = await response.json();
        console.log("Raw API data:", data); // Log raw data for debugging
        setRawApiData(data);
        
        // Map the API data to match expected structure
        // This is likely where the issue is occurring
        const formattedProjects = Array.isArray(data) ? data.map(item => ({
          _id: item._id || `temp-${Math.random()}`,
          title: item.title || "Untitled Project",
          category: item.category || "Uncategorized",
          image: item.image || "",
          style: item.style || "white" 
        })) : [];
        
        console.log("Formatted projects:", formattedProjects);
        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Dummy data as fallback if API fails or for testing
  const dummyProjects = [
    {
      _id: "dummy1",
      title: "School Management System",
      category: "School Management",
      image: "/api/placeholder/200/150",
      style: "white"
    },
    {
      _id: "dummy2",
      title: "Inventory Management",
      category: "Softwares",
      image: "/api/placeholder/200/150",
      style: "white"
    },
    {
      _id: "dummy3",
      title: "E-Learning Platform",
      category: "School Management",
      image: "/api/placeholder/200/150",
      style: "white"
    },
    {
      _id: "dummy4",
      title: "CRM System",
      category: "Softwares",
      image: "/api/placeholder/200/150", 
      style: "white"
    }
  ];

  // Use dummy data if loading failed or no data received
  const displayProjects = projects.length > 0 ? projects : (error ? dummyProjects : []);

  return (
    <div className="p-8 md:p-12 lg:p-16 bg-[#DDEEFF]">
      {/* Debug panel - remove in production */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
          <pre className="mt-2 text-xs">{JSON.stringify(rawApiData, null, 2)}</pre>
        </div>
      )}
      
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-3/4">
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, i) => (
                <div key={`loading-${i}`} className="rounded-2xl shadow-lg border border-gray-200 bg-white animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : displayProjects.length > 0 ? (
              displayProjects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  {/* Project Image Section - Fixed height */}
                  <div
                    className={`w-full flex items-center justify-center h-64 rounded-t-2xl overflow-hidden ${
                      project.style === "black-img-white-text" ? "bg-black" : "bg-white"
                    }`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-44 h-32 object-contain"
                        onError={(e) => {
                          console.log("Image failed to load:", e.target.src);
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/200/150";
                        }}
                      />
                    ) : (
                      <div className="w-44 h-32 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  {/* Text Section - Controlled height */}
                  <div className="w-full rounded-b-2xl p-4 bg-white">
                    <h3 className="text-xl font-bold truncate" title={project.title}>
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {project.category || "Uncategorized"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-2 text-center text-gray-600 py-10">
                No projects available.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProjects;
