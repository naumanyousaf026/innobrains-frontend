import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = ({ blog, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    category: '',
    content: '',
    status: 'draft',
    tags: [],
    author: 'Admin'
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const categories = ['Technology', 'Business', 'Health', 'Travel', 'Food', 'Lifestyle', 'Other'];

  useEffect(() => {
    if (blog && blog._id) {
      setIsEditing(true);
      setFormData({
        title: blog.title || '',
        duration: blog.duration || '',
        category: blog.category || '',
        content: blog.content || '',
        status: blog.status || 'draft',
        tags: blog.tags || [],
        author: blog.author || 'Admin'
      });
      
      if (blog.image || blog.featuredImage) {
        // Create a proper URL for image preview
        const imageUrl = getImageUrl(blog.image || blog.featuredImage);
        setImagePreview(imageUrl);
      }
    }
  }, [blog]);

  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Image must be JPEG, PNG, GIF or WEBP format');
        return;
      }
      
      setFeaturedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(''); // Clear any previous errors
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Verify required fields
      if (!formData.title || !formData.category) {
        throw new Error('Title and category are required');
      }

      const formDataToSend = new FormData();
      
      // Add all form fields
      for (const key in formData) {
        if (key === 'tags') {
          formDataToSend.append('tags', JSON.stringify(formData.tags));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      
      // Add the image only if there's a new one
      if (featuredImage) {
        formDataToSend.append('featuredImage', featuredImage);
      }

      // Set up API request
      const apiEndpoint = isEditing
        ? `https://apis.innobrains.pk/api/blog/${blog._id}`
        : 'https://apis.innobrains.pk/api/blog';
        
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          // Add CORS headers
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: false
      };

      // Make the request
      const response = isEditing
        ? await axios.put(apiEndpoint, formDataToSend, config)
        : await axios.post(apiEndpoint, formDataToSend, config);

      // Handle response
      setLoading(false);
      
      if (onClose) {
        onClose(response.data);
      }

      // Reset form if it's a new blog
      if (!isEditing) {
        resetForm();
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to save blog');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      duration: '',
      category: '',
      content: '',
      status: 'draft',
      tags: [],
      author: 'Admin'
    });
    setFeaturedImage(null);
    setImagePreview('');
    setTagInput('');
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">Read Duration (e.g. "5 min read")</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="featuredImage" className="block text-gray-700 font-medium mb-2">Featured Image</label>
            <input
              type="file"
              id="featuredImage"
              name="featuredImage"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              accept="image/*"
            />
            {imagePreview && (
              <div className="mt-2 relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-32 w-auto object-cover rounded border border-gray-200" 
                  onError={(e) => {
                    // Only set the error image once to prevent flickering
                    if (!e.target.src.includes('default-image.jpg')) {
                      e.target.src = "/images/default-image.jpg";
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setFeaturedImage(null);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">Tags</label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-indigo-500 hover:text-indigo-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-l-md shadow-sm p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="h-64 mb-12 bg-white"
          />
        </div>
        
        <div className="mt-16 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Create Blog')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;