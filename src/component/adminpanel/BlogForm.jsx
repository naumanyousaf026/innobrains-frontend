import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ blog: initialBlog, onClose }) => {
  const navigate = useNavigate();
  
  // Default empty blog structure with content as array
  const defaultBlog = {
    title: '',
    description: '',
    category: '',
    duration: '5 min read',
    content: [],
    status: 'draft',
    tags: []
  };

  const [blog, setBlog] = useState(initialBlog || defaultBlog);
  const [loading, setLoading] = useState(false);
  const [contentBlocks, setContentBlocks] = useState(
    initialBlog?.content && Array.isArray(initialBlog.content) 
      ? initialBlog.content 
      : []
  );
  const [newBlockType, setNewBlockType] = useState('paragraph');
  const [newBlockContent, setNewBlockContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    initialBlog?.images && initialBlog.images.length > 0
      ? `https://apis.innobrains.pk${initialBlog.images[0]}`
      : null
  );

  // Handle input changes for basic blog fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  // Add new content block to the blog
  const handleAddBlock = (e) => {
    e.preventDefault();
    if (!newBlockContent.trim()) return;

    const newBlock = {
      type: newBlockType,
      value: newBlockContent
    };

    setContentBlocks(prev => [...prev, newBlock]);
    setNewBlockContent('');
  };

  // Remove content block from the blog
  const handleRemoveBlock = (index) => {
    setContentBlocks(prev => prev.filter((_, i) => i !== index));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFeaturedImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  // Move block up or down
  const moveBlock = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === contentBlocks.length - 1)) {
      return;
    }
    
    const newBlocks = [...contentBlocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap blocks
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    setContentBlocks(newBlocks);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create a new blog object with content blocks
    const updatedBlog = {
      ...blog,
      content: contentBlocks
    };
    
    try {
      // Use FormData for file uploads
      const formData = new FormData();
      
      // Append blog data as JSON string
      formData.append('blogData', JSON.stringify(updatedBlog));
      
      // Add image file if present
      if (featuredImage) {
        formData.append('image', featuredImage);
      }
      
      // Determine if this is an edit or new blog
      const isEdit = initialBlog && initialBlog._id;
      const url = isEdit 
        ? `https://apis.innobrains.pk/api/blog/${initialBlog._id}`
        : 'https://apis.innobrains.pk/api/blog';
        
      const response = isEdit
        ? await axios.put(url, formData)
        : await axios.post(url, formData);
        
      if (response.status >= 200 && response.status < 300) {
        onClose(); // Close form and refresh blog list
      } else {
        console.error('Error saving blog:', response.data);
        alert('Failed to save blog. Please try again.');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={blog.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={blog.description || ''}
                onChange={handleInputChange}
                placeholder="Brief description of the blog"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>
            
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={blog.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="AI">AI</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={blog.duration || '5 min read'}
                  onChange={handleInputChange}
                  placeholder="5 min read"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {previewImage ? (
                  <div className="relative">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFeaturedImage(null);
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="cursor-pointer">
                      <div className="text-gray-500 mb-2">
                        Click to upload or drag and drop
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div className="bg-blue-50 text-blue-500 border border-blue-200 rounded-lg px-4 py-2 inline-block hover:bg-blue-100">
                        Select Image
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Content Blocks */}
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-3">Content Blocks</h3>
              
              {contentBlocks.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No content blocks yet. Add blocks using the form below.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                  {contentBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium uppercase bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {block.type}
                          </span>
                          <div className="ml-auto flex space-x-1">
                            <button
                              type="button"
                              onClick={() => moveBlock(index, 'up')}
                              className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                              disabled={index === 0}
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveBlock(index, 'down')}
                              className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                              disabled={index === contentBlocks.length - 1}
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveBlock(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <div className="mt-1 text-sm break-words">
                          {block.type === 'image' ? (
                            <div className="h-20 overflow-hidden">
                              <img
                                src={block.value}
                                alt="Content"
                                className="h-full object-cover rounded"
                              />
                            </div>
                          ) : (
                            <p className="line-clamp-2">{block.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Add new block form */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Add New Block</h4>
              <div className="mb-3">
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="heading">Heading</option>
                  <option value="subheading">Subheading</option>
                  <option value="image">Image URL</option>
                </select>
              </div>
              <div className="mb-3">
                {newBlockType === 'image' ? (
                  <input
                    type="text"
                    value={newBlockContent}
                    onChange={(e) => setNewBlockContent(e.target.value)}
                    placeholder="Enter image URL"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <textarea
                    value={newBlockContent}
                    onChange={(e) => setNewBlockContent(e.target.value)}
                    placeholder={`Enter ${newBlockType} content`}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={handleAddBlock}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
              >
                Add Block
              </button>
            </div>
          </div>
        </div>
        
        {/* Submit buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#103153] text-white rounded-lg hover:bg-[#1e4b7c] disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Saving...' : initialBlog ? 'Update Blog' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;