import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import webcard from '../images/image2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // Importing App.css

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  // Check if we're on the all blogs page
  const isAllBlogsPage = location.pathname === '/blog';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://apis.innobrains.pk/api/blog');
        const data = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Ensure full image URL handling (absolute URL)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-image.jpg"; // default image if no image is available

    // If the image path already includes the domain, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // If the path starts with a slash, it's probably a relative path
    if (imagePath.startsWith('/')) {
      return `https://apis.innobrains.pk${imagePath}`;
    }

    // Otherwise, assume it's a relative path without a leading slash
    return `https://apis.innobrains.pk/${imagePath}`;
  };

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
          <div className="text-center py-8">Loading blogs...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
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
                    src={getImageUrl(blog.featuredImage)}
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
                      Published by {blog.author} on {formatDate(blog.createdAt)}
                    </p>
                    <Link 
                      to={`/blog/${blog._id}`} 
                      className="text-[#103153] hover:text-indigo-800 font-semibold"
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read more
                      <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // If no blogs available, show placeholders to maintain design
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
                    <Link
                      to="/blog/placeholder"
                      className="text-[#103153] hover:text-indigo-800 font-semibold"
                      aria-label="Read more about Unraveling the Newest Features"
                    >
                      Read more
                      <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Read All Button - Hidden on the all blogs page */}
        {!isAllBlogsPage && (
          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="px-6 py-2 bg-[#F8AF2A] text-white rounded-full hover:bg-orange-600 transition duration-300"
              aria-label="Read all blog posts"
            >
              Read All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;