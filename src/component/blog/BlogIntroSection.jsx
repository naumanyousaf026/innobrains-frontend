import React from "react";
import "../../App.css";

const BlogIntroSection = () => {
  return (
    <div className="flex justify-center items-center bg-[#F9FAFB]">
      <div className="text-center mt-24 mb-4">
        <h1 className="text-5xl font-bold text-black poppins-thin leading-snug">
          Technology Blogs <br />
          For <span className="text-[#103153] ">Innovators</span>
        </h1>
        <p className="text-gray-500 mt-4 poppins-thin text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

export default BlogIntroSection;
