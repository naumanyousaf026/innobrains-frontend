import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // Importing App.css

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('https://apis.innobrains.pk/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(Array.isArray(data) ? data : [data]); // Handle both array and single object responses
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Function to create a text excerpt from HTML content
  const createExcerpt = (htmlContent, maxLength = 120) => {
    // Remove HTML tags and get plain text
    const plainText = htmlContent.replace(/<[^>]+>/g, '');
    // Create excerpt
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Fallback data for when API might fail
  const fallbackPost = {
    title: "Unraveling the Newest Features",
    category: "Category",
    duration: "5",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    featuredImage: null
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
        
        <div className="flex max-w-7xl mx-auto px-10 flex-col md:flex-row gap-8 justify-center">
          {loading ? (
            // Loading state
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 bg-[#FDFDFD]">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="text-center w-full text-red-500">
              Failed to load blog posts: {error}
            </div>
          ) : (
            // Display blog posts from API or fallback
            (blogPosts.length > 0 ? blogPosts : Array(3).fill(fallbackPost)).slice(0, 3).map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={post.featuredImage ? getImageUrl(post.featuredImage) : "/images/default-image.jpg"}
                  alt={post.title || "Blog Post"}
                />
                <div className="p-6 bg-[#FDFDFD]">
                  <div className="text-sm font-semibold text-[#103153] mb-2">
                    <span className='bg-[#EEEEEE] poppins-thin p-1'>{post.category || "Category"}</span>
                    <span className='ms-2 poppins-thin'>{post.duration || "5"} min read</span>
                  </div>
                  <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                    {post.title || "Unraveling the Newest Features"}
                  </h3>
                  <p className="text-gray-600 poppins-thin mb-4">
                    {post.content ? createExcerpt(post.content) : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                  </p>
                  <a
                    href={`/blog/${post.slug || "#"}`}
                    className="text-[#103153] hover:text-indigo-800 font-semibold"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read more
                    <FontAwesomeIcon icon={faChevronRight} className='ms-2 text-sm' />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

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