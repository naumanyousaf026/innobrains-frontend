import React from "react";
import "../App.css";

const BlogInfoSection = () => {
  return (
    <div className="flex  bg-[#F9FAFB]">
      <div className="text-left w-4/5 mx-auto">
        <h3 className="block text-lg font-semibold poppins-thin text-[#101010] mb-2">
          Blog
        </h3>
        <h1 className=" text-4xl lg:text-5xl poppins-thin font-bold text-[#101010] mb-5">
          Explore article and <span className="block mt-2"> information</span>
        </h1>
        <p className="text-[#5C5C5C] poppins-thin text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

export default BlogInfoSection;
