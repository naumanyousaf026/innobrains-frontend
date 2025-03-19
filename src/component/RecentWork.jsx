import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function RecentWork() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error fetching project data: {error}</div>;
  }

  return (
    <div className='bg-[#DDEEFF]'>
      {/* Heading and Description */}
      <div className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-[70px] lg:pr-20 md:px-0 flex flex-col items-start">
        <h3 className="block pt-28 text-lg font-semibold poppins-thin text-[#101010] mb-2">Projects</h3>
        <h1 className="text-4xl lg:text-5xl tracking-wide poppins-thin font-semibold text-[#101010] mb-5">
          See Our Recent Work
        </h1>
        <p className="text-[#5C5C5C] poppins-thin text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <section className="py-12 lg:pr-20 px-4 md:px-0 flex flex-col items-start w-full max-w-screen-lg mx-auto">
        
        {/* Projects */}
        <div className="flex flex-col space-y-8 w-full">
          {projects && projects.slice(0, 3).map((project, index) => (
            <div key={index} className="rounded-lg overflow-hidden flex flex-row">
              {/* Left Section (Image) */}
              <div className="flex-1 bg-black text-white flex items-center justify-center h-64">
                <img
                  src={`https://apis.innobrains.pk/uploads/${project.image}`}
                  alt={project.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
              {/* Right Section (Text) */}
              <div className="flex-1 flex flex-col justify-center p-6">
                <h3 className="text-2xl md:text-3xl tracking-wide font-semibold poppins-thin mb-2 poppins-thin">{project.name}</h3>
                <p className="text-gray-600 mb-4 poppins-thin">{project.description}</p>
                {/* Button */}
                <div className="flex justify-start">
                  <button className="w-auto poppins-thin text-center px-4 py-2 text-[#103153] border border-[#103153] rounded-full hover:bg-[#103153] hover:text-white transition flex items-center">
                    View Project
                    <FontAwesomeIcon icon={faChevronRight} className='ml-2 text-sm' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* See All Projects Button */}
        <div className="mt-24 w-full text-center">
          <button className="px-6 py-3 bg-[#F8AF2A] poppins-thin text[#101010] rounded-full hover:bg-yellow-600 transition duration-300">
            See All Projects
          </button>
        </div>
      </section>
    </div>
  );
}

export default RecentWork;