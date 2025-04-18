import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../App.css';

// Helper function to create slugs from titles - same as in BlogArticle
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                  // Trim leading/trailing spaces
};

const BlogSection = ({ limit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImagePath = "/images/default-image.jpg";
  // Check if we should show limited blogs or all
  const shouldLimitBlogs = limit !== undefined;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        console.log(data); // Log the data to check its structure
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog data", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get blog image using the same strategy as in Blog component
  const getBlogImage = (blog) => {
    // Check if blog has images array
    if (blog.images && Array.isArray(blog.images) && blog.images.length > 0) {
      return `https://apis.innobrains.pk${blog.images[0]}`;
    }
    
    // Look for first image in content blocks if available
    if (blog.content && Array.isArray(blog.content)) {
      const imageBlock = blog.content.find(block => block.type === "image");
      if (imageBlock && imageBlock.value && !imageBlock.value.startsWith("contentImage_")) {
        return imageBlock.value;
      }
    }
    
    // If image property exists (for backward compatibility)
    if (blog.image) {
      return `https://apis.innobrains.pk${blog.image}`;
    }
    
    return defaultImagePath; // Return default image if no image found
  };

  // Get blog description using the same strategy as in Blog component
  const getBlogDescription = (blog) => {
    if (blog.description) {
      return blog.description;
    }
    
    if (blog.content && Array.isArray(blog.content)) {
      const paragraphBlock = blog.content.find(block => block.type === "paragraph");
      if (paragraphBlock) {
        const text = paragraphBlock.value;
        return text.length > 120 ? text.substring(0, 120) + "..." : text;
      }
    }
    
    return "No description available";
  };

  // Determine which blogs to display based on whether limit is provided
  const displayBlogs = shouldLimitBlogs ? blogs.slice(0, limit) : blogs;

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
        <div className="flex max-w-7xl mx-auto px-10 flex-wrap">
          {loading ? (
            <div className="text-center w-full">Loading blogs...</div>
          ) : (
            displayBlogs.map((blog, index) => {
              const blogImage = getBlogImage(blog);
              const blogSlug = createSlug(blog.title);
              
              return (
                <div
                  key={index}
                  className="w-full md:w-1/3 px-4 mb-8"
                >
                  <div className="h-full bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105">
                    {blogImage ? (
                      <div className="w-full h-64 overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={blogImage}
                          alt={blog.title || "Blog Post"}
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentElement.style.display = "none";
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="p-6 bg-[#FDFDFD]">
                      <div className="text-sm font-semibold text-[#103153] mb-2">
                        <span className="bg-[#EEEEEE] poppins-thin p-1">{blog.category}</span>  
                        <span className="ms-2 poppins-thin">{blog.duration}</span>
                      </div>
                      <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 poppins-thin mb-4">
                        {getBlogDescription(blog)}
                      </p>
                      <Link
                        to={`/blog/${blogSlug}`}
                        state={{ blogData: blog }}
                        className="text-[#103153] hover:text-indigo-800 font-semibold"
                        aria-label={`Read more about ${blog.title}`}
                      >
                        Read more 
                        <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* Read All Button - only show when limit is set and there are more blogs than the limit */}
        {shouldLimitBlogs && blogs.length > limit && (
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
