import React, { useState, useEffect } from 'react';
import webcard from '../images/image2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; 

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://apis.innobrains.pk/api/blog?page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <div className="py-10 max-w-7xl mx-auto">
      <div className="container mx-auto">
        <div className="text-left my-16 px-10 mx-auto">
          <h3 className="block text-lg font-semibold poppins-thin text-[#101010] mb-2">Blog</h3>
          <h1 className="text-4xl lg:text-5xl poppins-thin font-bold text-[#101010] mb-5">
            Explore article and <span className="block mt-2">information</span> 
          </h1>
          <p className="text-[#5C5C5C] poppins-thin text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading blogs...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : (
          <div className="flex max-w-7xl mx-auto px-10 flex-col md:flex-row gap-8 justify-center">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
                >
                  <img
                    className=""
                    src={blog.featuredImage || webcard}
                    alt={blog.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = webcard;
                    }}
                  />
                  <div className="p-6 bg-[#FDFDFD]">
                    <div className="text-sm font-semibold text-[#103153] mb-2">
                      <span className="bg-[#EEEEEE] poppins-thin p-1">{blog.category}</span>{" "}
                      <span className="ms-2 poppins-thin">{blog.duration} min read</span>
                    </div>
                    <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 poppins-thin mb-4">
                      {blog.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."}
                    </p>
                    <a
                      href={`/blog/${blog.slug}`}
                      className="text-[#103153] hover:text-indigo-800 font-semibold"
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read more
                      <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              // Fill with placeholder cards if no blogs are available
              [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
                >
                  <img className="" src={webcard} alt="Blog Post" />
                  <div className="p-6 bg-[#FDFDFD]">
                    <div className="text-sm font-semibold text-[#103153] mb-2">
                      <span className="bg-[#EEEEEE] poppins-thin p-1">Category</span>{" "}
                      <span className="ms-2 poppins-thin">5 min read</span>
                    </div>
                    <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                      Unraveling the Newest Features
                    </h3>
                    <p className="text-gray-600 poppins-thin mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros.
                    </p>
                    <a
                      href="#"
                      className="text-[#103153] hover:text-indigo-800 font-semibold"
                      aria-label="Read more about Unraveling the Newest Features"
                    >
                      Read more
                      <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination (optional) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 disabled:opacity-50 rounded"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 disabled:opacity-50 rounded"
            >
              Next
            </button>
          </div>
        )}

        {/* Read All Button */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 bg-[#F8AF2A] text-white rounded-full hover:bg-orange-600 transition duration-300"
            aria-label="Read all blog posts"
          >
            Read All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;