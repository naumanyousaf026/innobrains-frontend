import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import BlogForm from "./BlogForm";

const Blog = () => {
  // Define a default image path to use when image loading fails
  const defaultImagePath = "/images/default-image.jpg"; // Update this path to your actual default image
  
  const [blogs, setBlogs] = useState([]); // Initialize as empty array
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9; // Total blogs per page
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://apis.innobrains.pk/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      // Ensure that data is an array, otherwise set to empty array
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // Set blogs to an empty array on error
    } finally {
      setIsLoading(false);
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
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Safely calculate these values
  const totalBlogs = blogs?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalBlogs / blogsPerPage));
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  // Make sure we're not accessing undefined properties
  const currentBlogs = Array.isArray(blogs) 
    ? blogs.slice(indexOfFirstBlog, indexOfLastBlog) 
    : [];

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

  // Function to truncate the description
  const truncateDescription = (description, maxLength = 100) => {
    if (!description) return "";
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

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
          {isLoading ? (
            <div className="text-center py-10">Loading blogs...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                    >
                      <img
                        src={blog.image ? `https://apis.innobrains.pk${blog.image}` : defaultImagePath}
                        alt={blog.title || "Blog image"}
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = defaultImagePath;
                        }}
                      />
                      <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
                      <p className="text-gray-600">{blog.category}</p>
                      <p className="text-gray-800 mt-2 flex-grow">
                        {truncateDescription(blog.description, 90)}
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
                  <div className="col-span-3 text-center py-10">No blogs found</div>
                )}
              </div>

              {totalBlogs > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                  <span className="mb-2 md:mb-0">
                    Showing {indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, totalBlogs)} of {totalBlogs}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
        </>
      )}
    </div>
  );
};

export default Blog;