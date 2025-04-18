import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const BlogSection = () => {
  // State to store blog posts
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT_HERE');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to truncate text to a specific length
  const truncateText = (text, maxLength) => {
    // Remove HTML tags and decode HTML entities
    const div = document.createElement('div');
    div.innerHTML = text;
    const plainText = div.textContent || div.innerText || '';
    
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
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
            Latest insights and perspectives on technology and more
          </p>
        </div>

        {isLoading && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Loading blog posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="flex max-w-7xl mx-auto px-10 flex-col md:flex-row gap-8 justify-center">
            {blogPosts.length > 0 ? (
              blogPosts.slice(0, 3).map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
                >
                  <img
                    className="w-full h-52 object-cover"
                    src={post.featuredImage || '/default-blog-image.jpg'}
                    alt={post.title}
                  />
                  <div className="p-6 bg-[#FDFDFD]">
                    <div className="text-sm font-semibold text-[#103153] mb-2">
                      <span className="bg-[#EEEEEE] poppins-thin p-1">{post.category}</span>
                      <span className="ms-2 poppins-thin">{post.duration} min read</span>
                    </div>
                    <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 poppins-thin mb-4">
                      {truncateText(post.content, 120)}
                    </p>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-[#103153] hover:text-indigo-800 font-semibold"
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read more 
                      <FontAwesomeIcon icon={faChevronRight} className="ms-2 text-sm" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full py-10 text-gray-600">No blog posts available.</p>
            )}
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