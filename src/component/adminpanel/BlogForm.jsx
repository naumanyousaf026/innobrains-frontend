import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = ({ blogId, onSubmitSuccess }) => {
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
    if (blogId) {
      setIsEditing(true);
      fetchBlogData();
    }
  }, [blogId]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://apis.innobrains.pk/api/blog/${blogId}`);
      const blog = response.data;
      
      setFormData({
        title: blog.title,
        duration: blog.duration,
        category: blog.category,
        content: blog.content,
        status: blog.status,
        tags: blog.tags || [],
        author: blog.author
      });
      
      if (blog.featuredImage) {
        setImagePreview(blog.featuredImage);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog data');
      setLoading(false);
      console.error('Error fetching blog:', err);
    }
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
      setFeaturedImage(file);
      setImagePreview(URL.createObjectURL(file));
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
      const formDataToSend = new FormData();
      
      for (const key in formData) {
        if (key === 'tags') {
          formDataToSend.append('tags', JSON.stringify(formData.tags));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      
      if (featuredImage) {
        formDataToSend.append('featuredImage', featuredImage);
      }

      let response;
      if (isEditing) {
        response = await axios.put(
          `https://apis.innobrains.pk/api/blog/${blogId}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        response = await axios.post(
          'https://apis.innobrains.pk/api/blog',
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      setLoading(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(response.data);
      }

      if (!isEditing) {
        resetForm();
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to save blog');
      console.error('Error saving blog:', err);
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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="featuredImage" className="block text-gray-700 font-medium mb-2">Featured Image</label>
            <input
              type="file"
              id="featuredImage"
              name="featuredImage"
              onChange={handleImageChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              accept="image/*"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="h-32 w-auto object-cover rounded" />
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
              className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="h-64 mb-12"
          />
        </div>
        
        <div className="mt-16 flex justify-end space-x-3">
          {isEditing && (
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
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