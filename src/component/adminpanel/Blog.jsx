import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BlogForm from "./BlogForm";

const Blog = () => {
  const defaultImagePath = "/images/default-image.jpg";
  
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(9);
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewBlog, setViewBlog] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://apis.innobrains.pk/api/blog");
      setBlogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`https://apis.innobrains.pk/api/blog/${blogId}`);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        if (viewBlog && viewBlog._id === blogId) {
          setViewBlog(null);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  // Calculate pagination values
  const totalBlogs = blogs?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalBlogs / blogsPerPage));
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = Array.isArray(blogs) 
    ? blogs.slice(indexOfFirstBlog, indexOfLastBlog) 
    : [];

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setShowForm(true);
    setViewBlog(null);
  };

  const handleAddNewBlog = () => {
    setEditBlog(null);
    setShowForm(true);
    setViewBlog(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditBlog(null);
    fetchBlogs();
  };

  const handleViewBlog = (blog) => {
    setViewBlog(blog);
    setShowForm(false);
  };

  const truncateDescription = (content, maxLength = 120) => {
    if (!content || !Array.isArray(content)) return "";
    
    // Find the first paragraph content
    const paragraphBlock = content.find(block => block.type === "paragraph");
    if (!paragraphBlock) return "";
    
    const text = paragraphBlock.value;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // Function to check if a blog has a valid image
  const hasValidImage = (blog) => {
    // Check uploaded images
    if (blog.images && blog.images.length > 0) {
      return true;
    }
    
    // Check content blocks for images
    if (blog.content && Array.isArray(blog.content)) {
      const imageBlock = blog.content.find(block => block.type === "image");
      if (imageBlock && imageBlock.value && !imageBlock.value.startsWith("contentImage_")) {
        return true;
      }
    }
    
    return false;
  };

  // Function to get the featured image from a blog
  const getBlogImage = (blog) => {
    if (imageErrors[blog._id]) {
      return defaultImagePath;
    }
    
    if (blog.images && blog.images.length > 0) {
      return `https://apis.innobrains.pk${blog.images[0]}`;
    }
    
    // Look for first image in content blocks
    if (blog.content && Array.isArray(blog.content)) {
      const imageBlock = blog.content.find(block => block.type === "image");
      if (imageBlock && imageBlock.value && !imageBlock.value.startsWith("contentImage_")) {
        return imageBlock.value;
      }
    }
    
    return defaultImagePath;
  };

  const handleImageError = (blogId) => {
    setImageErrors(prev => ({
      ...prev,
      [blogId]: true
    }));
  };

  // Render content blocks based on their type
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={index} className="text-2xl font-bold my-4">
            {block.value}
          </h2>
        );
      case "subheading":
        return (
          <h3 key={index} className="text-xl font-semibold my-3 text-gray-700">
            {block.value}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="my-3 text-gray-600 leading-relaxed">
            {block.value}
          </p>
        );
      case "image":
        // Handle both uploaded images and image URLs
        const imageUrl = block.value.startsWith("contentImage_")
          ? null // These should be replaced with actual paths from the server
          : block.value;
          
        if (!imageUrl) return null;
        
        const imageId = `content-image-${index}`;
        
        return (
          <div key={index} className="my-4">
            {!imageErrors[imageId] && (
              <img
                src={imageUrl}
                alt="Blog content"
                className="max-w-full h-auto rounded-lg mx-auto"
                onError={() => handleImageError(imageId)}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm 
            ? (editBlog ? "Edit Blog" : "Add New Blog") 
            : viewBlog ? viewBlog.title : "Blogs"}
        </h1>
        <div>
          {!showForm && !viewBlog && (
            <button
              onClick={handleAddNewBlog}
              className="bg-[#103153] text-white px-5 py-2 rounded-lg hover:bg-[#1e4b7c] transition flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Blog
            </button>
          )}
          {viewBlog && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(viewBlog)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
              </button>
              <button
                onClick={() => setViewBlog(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Back to Blogs
              </button>
            </div>
          )}
        </div>
      </div>

      {showForm ? (
        <BlogForm blog={editBlog} onClose={handleFormClose} />
      ) : viewBlog ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          {hasValidImage(viewBlog) && !imageErrors[viewBlog._id] && (
            <div className="mb-6">
              <img
                src={getBlogImage(viewBlog)}
                alt={viewBlog.title}
                className="w-full h-64 object-cover rounded-lg"
                onError={() => handleImageError(viewBlog._id)}
              />
            </div>
          )}
          
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <span className="mr-4">{viewBlog.category}</span>
            <span>{viewBlog.duration}</span>
          </div>
          
          <div className="prose max-w-none">
            {Array.isArray(viewBlog.content) && viewBlog.content.map(renderContentBlock)}
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#103153] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
                    >
                      <div 
                        className="cursor-pointer"
                        onClick={() => handleViewBlog(blog)}
                      >
                        {hasValidImage(blog) && !imageErrors[blog._id] && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={getBlogImage(blog)}
                              alt={blog.title || "Blog image"}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                              onError={() => handleImageError(blog._id)}
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span className="mr-3">{blog.category}</span>
                            <span>{blog.duration}</span>
                          </div>
                          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {truncateDescription(blog.content)}
                          </p>
                        </div>
                      </div>
                      <div className="border-t px-4 py-3 flex justify-end space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(blog);
                          }}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <FontAwesomeIcon icon={faEdit} size="lg" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(blog._id);
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrashCan} size="lg" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10 bg-white rounded-lg shadow">
                    <div className="text-gray-400 text-lg mb-4">No blogs found</div>
                    <button
                      onClick={handleAddNewBlog}
                      className="bg-[#103153] text-white px-4 py-2 rounded-md hover:bg-[#1e4b7c]"
                    >
                      Create your first blog
                    </button>
                  </div>
                )}
              </div>

              {totalBlogs > blogsPerPage && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white p-4 rounded-lg shadow">
                  <span className="mb-2 md:mb-0 text-gray-600">
                    Showing {indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, totalBlogs)} of {totalBlogs}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1 ? "bg-gray-300" : "bg-[#103153] text-white"
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        // If 5 or fewer pages, show all page numbers
                        pageNum = i + 1;
                      } else {
                        // For more than 5 pages, show a window around the current page
                        const middlePoint = Math.min(Math.max(3, currentPage), totalPages - 2);
                        pageNum = i - 2 + middlePoint;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded ${
                            pageNum === currentPage
                              ? "bg-[#103153] text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages ? "bg-gray-300" : "bg-[#103153] text-white"
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