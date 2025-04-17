import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(9); // Blogs per page
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-semibold mb-6">Blogs</h1>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                {/* Blog Image */}
                {blog.featuredImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{blog.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={blogs.length < blogsPerPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
