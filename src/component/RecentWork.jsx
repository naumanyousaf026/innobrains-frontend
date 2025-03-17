import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function RecentWork() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the product data from the backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/product"); // Ensure this URL matches your backend
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

  if (error) {
    return <div>Error fetching project data: {error}</div>;
  }

  return (
    <div className="bg-[#F9FAFB]">
      <section className="py-12 lg:pr-20 px-4 md:px-0 flex flex-col items-start w-full max-w-screen-lg mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 poppins-thin">
            See Our Recent Work
          </h2>
          <p className="text-gray-500 text-base sm:text-lg poppins-thin">
            Discover our latest projects that showcase our expertise.
          </p>
        </div>

        <div className="flex flex-col space-y-8 w-full">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              <div className="flex-1 bg-black text-white flex items-center justify-center h-64">
                <img
                  src={`https://apis.innobrains.pk/uploads/${project.image}`} // Updated image path
                  alt={project.name}
                  className="w-32 h-50 object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center p-6">
                <h3 className="text-4xl md:text-4xl font-bold mb-2 poppins-thin">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4 poppins-thin">
                  {project.description}
                </p>

                <div className="flex justify-start">
                  <button className="w-auto poppins-thin text-center px-4 py-2 text-[#103153] border border-[#103153] rounded-full font-semibold hover:bg-[#103153] hover:text-white transition flex items-center">
                    View Project
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="ml-2 text-sm"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 w-full text-center">
          <button className="px-6 py-2 bg-[#F8AF2A] poppins-thin text-white rounded-full hover:bg-yellow-600 transition duration-300">
            See All Projects
          </button>
        </div>
      </section>
    </div>
  );
}

export default RecentWork;
