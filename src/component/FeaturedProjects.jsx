import React, { useState, useEffect } from "react";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  
  // Categories for the left menu
  const categories = ["ALL", "Softwares", "School Management"];

  useEffect(() => {
    fetchProjects();
  }, []);

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

  // Function to determine style for each project card
  const getProjectStyle = (index) => {
    // Alternating styles as in the original design
    const styles = ["white", "black-img-white-text", "black-img-white-text", "white"];
    return styles[index % styles.length];
  };

  return (
    <div className="p-16 bg-[#DDEEFF]">
      <section className="container bg-[#DDEEFF] max-w-7xl mx-auto px-4 sm:px-6 lg:px-[70px] lg:pr-20 flex flex-col items-start">
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
        <h2 className="text-3xl font-bold text-gray-900 text-[42px] mb-8 max-w-md leading-tight">
          Take A Look At <span className="text-[#103153]">Some Of Our Work</span>
        </h2>
        
        <div className="flex justify-between w-full">
          {/* Left Side Menu */}
          <div className="relative w-1/4">
            <div className="absolute left-1 top-2 h-[70px] border-l-2 border-dashed border-gray-400"></div>
            <ul className="space-y-4">
              {categories.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full absolute left-0 ${item === activeCategory ? "bg-[#103153]" : "bg-gray-500"}`}></span>
                  <span 
                    className={`ml-4 font-bold cursor-pointer ${item === activeCategory ? "text-blue-900" : "text-gray-700"}`}
                    onClick={() => setActiveCategory(item)}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-2 gap-5 w-[100%] md:w-[75%] xl:w-[60%]">
            {error ? (
              <div className="col-span-2 text-red-500">Error loading projects: {error}</div>
            ) : projects.length === 0 ? (
              <div className="col-span-2 text-gray-500">Loading projects...</div>
            ) : (
              projects.slice(0, 4).map((project, index) => {
                const style = getProjectStyle(index);
                return (
                  <div
                    key={project._id || index}
                    className={`md:w-52 xl:w-80 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl flex flex-col items-center justify-center ${
                      style === "white" ? "bg-white text-black" 
                      : style === "black-img-white-text" ? "bg-white text-black border border-gray-300" 
                      : "bg-black text-white"
                    }`}
                  >
                    {/* Project Image Section */}
                    <div className={`w-full flex rounded-2xl items-center justify-center h-64 ${
                      style === "black-img-white-text" ? "bg-black" : "bg-white"
                    }`}>
                      <img
                        src={`https://apis.innobrains.pk/uploads/${project.image}`}
                        alt={project.name}
                        className="w-44 h-32 object-contain"
                      />
                    </div>
                    
                    {/* Text Section */}
                    <div className={`w-full rounded-2xl p-4 ${
                      style === "black-img-white-text" ? "bg-white text-black" : ""
                    }`}>
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.description}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProjects;