import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import slugify from "slugify";
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import { 
  FaPlus, 
  FaTimes, 
  FaCloudUploadAlt, 
  FaSave, 
  FaTrash, 
  FaArrowLeft 
} from "react-icons/fa";

const BlogForm = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewBlog, setViewBlog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const defaultImagePath = "/images/default-image.jpg";
  
  // Current blog state
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: "",
    slug: "",
    duration: "",
    category: "",
    content: "",
    featuredImage: null
  });
  
  const editorRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (currentBlog.title) {
      const generatedSlug = slugify(currentBlog.title, { lower: true, strict: true });
      setCurrentBlog(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [currentBlog.title]);

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

  const handleAddNewBlog = () => {
    setCurrentBlog({
      id: null,
      title: "",
      slug: "",
      duration: "",
      category: "",
      content: "",
      featuredImage: null
    });
    setIsEditorOpen(true);
    setViewBlog(null);
  };
  // jfqeefu7t3b4a8cpf1ph9ljax441no81qenakmkpl3f7qc4o
  const handleEdit = (blog) => {
    // Transform the content blocks into TinyMCE compatible HTML
    let editorContent = "";
    if (Array.isArray(blog.content)) {
      blog.content.forEach(block => {
        switch (block.type) {
          case "heading":
            editorContent += `<h2>${block.value}</h2>`;
            break;
          case "subheading":
            editorContent += `<h3>${block.value}</h3>`;
            break;
          case "paragraph":
            editorContent += `<p>${block.value}</p>`;
            break;
          case "image":
            if (block.value && !block.value.startsWith("contentImage_")) {
              editorContent += `<div class="image-container"><img src="${block.value}" alt="Blog content" /></div>`;
            }
            break;
          default:
            break;
        }
      });
    }
    
    // Set featured image if exists
    let featuredImage = null;
    if (blog.images && blog.images.length > 0) {
      featuredImage = {
        preview: `https://apis.innobrains.pk${blog.images[0]}`
      };
    }
    
    setCurrentBlog({
      id: blog._id,
      title: blog.title || "",
      slug: blog.slug || "",
      duration: blog.duration || "",
      category: blog.category || "",
      content: editorContent,
      featuredImage
    });
    
    setIsEditorOpen(true);
    setViewBlog(null);
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

  const handleViewBlog = (blog) => {
    setViewBlog(blog);
    setIsEditorOpen(false);
  };

  const handleFormClose = () => {
    setIsEditorOpen(false);
    setCurrentBlog({
      id: null,
      title: "",
      slug: "",
      duration: "",
      category: "",
      content: "",
      featuredImage: null
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentBlog(prev => ({
        ...prev,
        featuredImage: {
          file,
          preview: URL.createObjectURL(file)
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!editorRef.current) {
        throw new Error("Editor not initialized");
      }
      
      const editorContent = editorRef.current.getContent();
      
      // Convert TinyMCE content to our API format
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorContent, 'text/html');
      const elements = doc.body.children;
      
      const contentBlocks = [];
      
      Array.from(elements).forEach(element => {
        switch (element.tagName.toLowerCase()) {
          case 'h1':
            contentBlocks.push({ type: "heading", value: element.textContent });
            break;
          case 'h2':
            contentBlocks.push({ type: "heading", value: element.textContent });
            break;
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            contentBlocks.push({ type: "subheading", value: element.textContent });
            break;
          case 'p':
            contentBlocks.push({ type: "paragraph", value: element.textContent });
            break;
          case 'div':
            if (element.classList.contains('image-container') && element.querySelector('img')) {
              const img = element.querySelector('img');
              contentBlocks.push({ type: "image", value: img.src });
            }
            break;
          default:
            contentBlocks.push({ type: "paragraph", value: element.outerHTML });
        }
      });

      const formData = new FormData();
      formData.append("title", currentBlog.title);
      formData.append("slug", currentBlog.slug);
      formData.append("duration", currentBlog.duration);
      formData.append("category", currentBlog.category);
      formData.append("content", JSON.stringify(contentBlocks));

      // Add featured image if exists
      if (currentBlog.featuredImage && currentBlog.featuredImage.file) {
        formData.append("images", currentBlog.featuredImage.file);
      }

      let response;
      if (currentBlog.id) {
        // Update existing blog
        response = await axios.put(
          `https://apis.innobrains.pk/api/blog/${currentBlog.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Create new blog
        response = await axios.post(
          "https://apis.innobrains.pk/api/blog",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      
      alert(currentBlog.id ? "Blog updated successfully!" : "Blog created successfully!");
      handleFormClose();
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Failed to save blog. Please try again.");
    } finally {
      setIsSubmitting(false);
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

  // Render content blocks based on their type for blog view
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

  // Define TinyMCE Editor init configuration
  const tinyMceInit = {
    height: 500,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
      'emoticons', 'hr'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic forecolor backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | h1 h2 h3 h4 h5 h6 | help | ' +
      'link image media | table | emoticons | hr code',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px }',
    image_advtab: true,
    image_caption: true,
    image_dimensions: false,
    formats: {
      alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,figure', classes: 'text-left' },
      aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,figure', classes: 'text-center' },
      alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,figure', classes: 'text-right' },
      alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table', classes: 'text-justify' }
    },
    file_picker_types: 'image',
    file_picker_callback: function(callback, value, meta) {
      // Custom file picker logic would go here
      // For now, we'll just use a file input
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      
      input.onchange = function() {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function() {
          // Create a blob URL and pass it to the callback
          callback(reader.result, {
            title: file.name
          });
        };
        reader.readAsDataURL(file);
      };
      
      input.click();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {isEditorOpen ? (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {currentBlog.id ? "Edit Blog" : "Create New Blog"}
            </h1>
            <button
              onClick={handleFormClose}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter blog title"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
                  value={currentBlog.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-lg font-semibold text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  placeholder="blog-post-url"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
                  value={currentBlog.slug}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  This will appear in the URL: https://innobrains.pk/blog/{currentBlog.slug}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="duration" className="block text-lg font-semibold text-gray-700 mb-2">
                  Reading Time
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="E.g., 5 min read"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
                  value={currentBlog.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Enter blog category"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#103153] focus:border-transparent"
                  value={currentBlog.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition hover:border-[#103153]">
                <input 
                  type="file" 
                  accept="image/*" 
                  id="featuredImage"
                  onChange={handleImageChange}
                  className="hidden" 
                />
                <label htmlFor="featuredImage" className="cursor-pointer w-full h-full block">
                  {currentBlog.featuredImage ? (
                    <div className="relative">
                      <img
                        src={currentBlog.featuredImage.preview}
                        alt="Featured"
                        className="h-40 mx-auto object-contain"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentBlog(prev => ({ ...prev, featuredImage: null }));
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400" />
                      <p className="mt-2 text-gray-600">Click or drag to upload featured image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Blog Content
              </label>
              <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={currentBlog.content}
                init={tinyMceInit}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={handleFormClose}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#103153] text-white rounded-lg hover:bg-[#1e4b7c] transition flex items-center"
              >
                <FaSave className="mr-2" /> {isSubmitting ? "Saving..." : currentBlog.id ? "Update Blog" : "Create Blog"}
              </button>
            </div>
          </form>
        </div>
      ) : viewBlog ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">{viewBlog.title}</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(viewBlog)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setViewBlog(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Back to Blogs
              </button>
            </div>
          </div>
          
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
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Blogs</h1>
            <div>
              {blogs.length > 0 ? (
                <button
                  onClick={handleAddNewBlog}
                  className="bg-[#103153] text-white px-5 py-2 rounded-lg hover:bg-[#1e4b7c] transition flex items-center"
                >
                  <FaPlus className="mr-2" /> Add New Blog
                </button>
              ) : null}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#103153] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</h2>
                <p className="text-gray-500">Start creating your first blog post</p>
              </div>
              <button
                onClick={handleAddNewBlog}
                className="flex items-center justify-center w-16 h-16 bg-[#103153] text-white rounded-full hover:bg-[#1e4b7c] transition shadow-lg"
              >
                <FaPlus size={24} />
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
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
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(blog._id);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
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
                        pageNum = i + 1;
                      } else {
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

export default BlogForm;