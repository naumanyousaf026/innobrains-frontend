import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../App.css'; // Importing App.css

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 3; // Defined a limit for the "Read All" button condition

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog data", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-10 max-w-7xl mx-auto">
      <div className="container mx-auto">
        <div className="text-left my-16 px-10 mx-auto">
          <h3 className="block text-lg font-semibold poppins-thin text-[#101010] mb-2">Blog</h3>
          <h1 className="text-4xl lg:text-5xl poppins-thin font-bold text-[#101010] mb-5">
            Explore article and <span className="block mt-2">information</span>
          </h1>
          <p className="text-[#5C5C5C] poppins-thin text-lg">
            Transforming businesses through innovative software solutions and cutting-edge technology.
          </p>
        </div>
        <div className="flex max-w-7xl mx-auto px-10 flex-col md:flex-row gap-8 justify-center">
          {loading ? (
            <div className="text-center w-full">Loading blogs...</div>
          ) : (
            blogs.slice(0, 3).map((blog, index) => (
              <div
                key={index}
                className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="w-full aspect-[4/4] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://apis.innobrains.pk${blog.image}`}
                    alt={blog.title || "Blog Post"}
                  />
                </div>
                <div className="p-6 bg-[#FDFDFD]">
                  <div className="text-sm font-semibold text-[#103153] mb-2">
                    <span className="bg-[#EEEEEE] poppins-thin p-1">{blog.category}</span>  
                    <span className="ms-2 poppins-thin">{blog.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 poppins-thin mb-4">
                    {blog.description}
                  </p>
                  <Link
                    to={`/blog/${blog.id}`} // Change this to your specific blog route
                    className="text-[#103153] hover:text-indigo-800 font-semibold"
                    aria-label={`Read more about ${blog.title}`}
                  >
                    Read more 
                    <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Read All Button */}
        {blogs.length > limit && (
          <div className="mt-8 text-center">
            <Link to="/blog">
              <button
                className="px-6 py-2 bg-[#F8AF2A] text-white rounded-full hover:bg-orange-600 transition duration-300 poppins-thin"
                aria-label="Read all blog posts"
              >
                Read All
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
