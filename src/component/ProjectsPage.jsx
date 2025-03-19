import React from "react";
import FeaturedProjects from "./FeaturedProjects";
import RecentWork from "./RecentWork";


const ProjectsPage = () => {
  return (
    <div className="w-full ">
      {/* Featured Projects Section */}
      <div className="hidden md:block w-full">
        <FeaturedProjects />
      </div>

      {/* Recent Work Section */}
      <div className=" block md:hidden  w-full">
        <RecentWork />
      </div>
    </div>
  );
};

export default ProjectsPage;