import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import BlogForm from "./BlogForm";

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // Initialized as empty array
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://apis.innobrains.pk/api/blog");
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data.blogs is an array
      if (Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]); // Set blogs to empty array if not an array
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.message);
      setBlogs([]); // Set blogs to empty array on error
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`https://apis.innobrains.pk/api/blog/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
      } else {
        throw new Error(`Failed to delete blog: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = Array.isArray(blogs) && blogs.length ? blogs.slice(indexOfFirstBlog, indexOfLastBlog) : [];
  const totalPages = Array.isArray(blogs) && blogs.length ? Math.ceil(blogs.length / blogsPerPage) : 0;

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setShowForm(true);
  };

  const handleAddNewBlog = () => {
    setEditBlog(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchBlogs();
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description && description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description || ''; // Safeguard for undefined or null description
  };

  // Create a proper image URL function to handle different image path formats
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-image.jpg";
    
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

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto flex justify-center items-center">
        <div className="text-xl">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto flex justify-center items-center">
        <div className="bg-red-100 p-4 rounded text-red-700">
          <h2 className="font-bold">Error loading blogs</h2>
          <p>{error}</p>
          <button 
            onClick={() => fetchBlogs()} 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm ? (editBlog ? "Edit Blog" : "Add New Blog") : "Blogs"}
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNewBlog}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Blog
          </button>
        )}
      </div>

      {showForm ? (
        <BlogForm blog={editBlog} onClose={handleFormClose} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                >
                  <div className="w-full h-32 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={getImageUrl(blog.image || blog.featuredImage)}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Only set the error image once to prevent flickering
                        if (!e.target.src.includes('default-image.jpg')) {
                          e.target.src = "/images/default-image.jpg";
                        }
                      }}
                    />
                  </div>
                  <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
                  <p className="text-gray-600">{blog.category}</p>
                  <p className="text-gray-800 mt-2 flex-grow">
                    {truncateDescription(blog.description, 90)}{" "}
                  </p>
                  <hr className="my-2" />
                  <div className="flex justify-between mt-3 px-10 shadow-sm">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-yellow-500 hover:text-yellow-600 transform hover:scale-110 transition-transform"
                    >
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-600 transform hover:scale-110 transition-transform"
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No blogs found. Add your first blog!</p>
              </div>
            )}
          </div>

          {blogs.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
              <span className="mb-2 md:mb-0">
                Showing {indexOfFirstBlog + 1}-{" "}
                {Math.min(indexOfLastBlog, blogs.length)} of {blogs.length}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        page === currentPage
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;