import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // Importing App.css

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_ENDPOINT = 'https://apis.innobrains.pk/api/blog'; // Replace with your actual API endpoint

  // Ensure full image URL handling (absolute URL)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-image.jpg"; // Default image if no image is available

    // If the image path already includes the domain, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // If the path starts with a slash, it's likely a relative path
    if (imagePath.startsWith('/')) {
      return `https://apis.innobrains.pk${imagePath}`;
    }

    // Otherwise, assume it's a relative path without a leading slash
    return `https://apis.innobrains.pk/${imagePath}`;
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Log the entire response to see its structure
        
        // Handle different response structures - ensure we always have an array
        const postsArray = Array.isArray(data) ? data : (data.posts || data.data || []);
        setBlogPosts(postsArray);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div className="text-center py-10">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading blog posts: {error.message}</div>;
  }

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
          {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  className="w-full" // Make the image responsive within the card
                  src={getImageUrl(post.featuredImage)}
                  alt={post.title}
                />
                <div className="p-6 bg-[#FDFDFD]">
                  <div className="text-sm font-semibold text-[#103153] mb-2">
                    <span className='bg-[#EEEEEE] poppins-thin p-1'>{post.category}</span>  <span className='ms-2 poppins-thin'>{post.duration} min read</span>
                  </div>
                  <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 poppins-thin mb-4">
                    {post.content.substring(0, 100)}... {/* Display a content snippet */}
                  </p>
                  <a
                    href={`/blog/${post.slug}`} // Adjust the link as needed
                    className="text-[#103153] hover:text-indigo-800 font-semibold"
                    aria-label={`Read more about ${post.title} poppins-thin`}
                  >
                    Read more
                    <FontAwesomeIcon icon={faChevronRight} className='ms-2 text-sm' />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 w-full">No blog posts available</div>
          )}
        </div>

        {/* Read All Button */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 bg-[#F8AF2A] text-white rounded-full hover:bg-orange-600 transition duration-300"
            aria-label="Read all blog posts poppins-thin"
          >
            Read All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;