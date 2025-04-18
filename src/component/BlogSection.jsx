import React, { useState, useEffect } from 'react';
import webcard from '../images/image2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
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
            Latest insights and updates from our team
          </p>
        </div>
        
        <div className="flex max-w-7xl mx-auto px-10 flex-col md:flex-row gap-8 justify-center">
          {blogs.slice(0, 3).map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-48 object-cover"
                src={post.featuredImage || webcard}
                alt={post.title}
              />
              <div className="p-6 bg-[#FDFDFD]">
                <div className="text-sm font-semibold text-[#103153] mb-2">
                  <span className='bg-[#EEEEEE] poppins-thin p-1'>{post.category}</span>
                  <span className='ms-2 poppins-thin'>{post.duration} min read</span>
                </div>
                <h3 className="text-xl font-bold poppins-thin text-gray-900 mb-2">
                  {post.title}
                </h3>
                <div className="text-gray-600 poppins-thin mb-4 line-clamp-3">
                  {post.content.replace(/<[^>]+>/g, '')}
                </div>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-[#103153] hover:text-indigo-800 font-semibold"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read more 
                  <FontAwesomeIcon icon={faChevronRight} className='ms-2 text-sm' />
                </a>
              </div>
            </div>
          ))}
        </div>

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