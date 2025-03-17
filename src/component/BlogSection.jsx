import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const BlogSection = ({ limit }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blog data", error);
      }
    };

    fetchBlogs();
  }, []);

  const displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="py-10 bg-[#F9FAFB]">
      <div className="container px-4 w-5/6 mx-auto">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {displayedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 will-change-transform"
            >
              <img
                className="w-full h-48 object-cover"
                src={`https://apis.innobrains.pk${blog.image}`}
                alt="Blog"
                onError={(e) => {
                  e.target.src = "/images/default-image.jpg";
                }}
              />
              <div className="p-6 bg-[#FDFDFD]">
                <div className="text-sm font-semibold text-[#103153] mb-2">
                  <span className="bg-[#EEEEEE] p-1">{blog.category}</span>{" "}
                  <span className="ms-2">{blog.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                  aria-label={`Read more about ${blog.title}`}
                >
                  Read more
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ms-2 text-sm"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
        {limit && blogs.length > limit && (
          <div className="mt-8 text-center">
            <button className="px-6 py-2 bg-[#F8AF2A] text-white rounded-full hover:bg-orange-600 transition duration-300">
              See All Blogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
