import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, MoveUp, MoveDown, Image as ImageIcon } from 'lucide-react';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [content, setContent] = useState([
    { type: 'paragraph', value: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add a new content block
  const addContentBlock = (type) => {
    setContent([...content, { type, value: '' }]);
  };

  // Remove a content block
  const removeContentBlock = (index) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };

  // Move a content block up
  const moveBlockUp = (index) => {
    if (index === 0) return;
    const newContent = [...content];
    [newContent[index - 1], newContent[index]] = [newContent[index], newContent[index - 1]];
    setContent(newContent);
  };

  // Move a content block down
  const moveBlockDown = (index) => {
    if (index === content.length - 1) return;
    const newContent = [...content];
    [newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]];
    setContent(newContent);
  };

  // Update content block value
  const updateContentValue = (index, value) => {
    const newContent = [...content];
    newContent[index].value = value;
    setContent(newContent);
  };

  // Handle image selection for content blocks
  const handleContentImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContentValue(index, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL input for content blocks
  const handleImageUrlInput = (index, url) => {
    updateContentValue(index, url);
  };

  // Handle main image change
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('duration', duration);
      formData.append('category', category);

      // Process content blocks
      const processedContent = content.map(item => {
        // For image blocks that use DataURLs, we need to extract the file
        if (item.type === 'image' && item.value.startsWith('data:image')) {
          // Convert DataURL to Blob
          const byteString = atob(item.value.split(',')[1]);
          const mimeString = item.value.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const fileName = `content-image-${Date.now()}.${mimeString.split('/')[1]}`;
          formData.append('images', new File([blob], fileName, { type: mimeString }));
          
          // Return a placeholder to be replaced by the backend
          return { type: 'image', value: fileName };
        }
        return item;
      });

      formData.append('content', JSON.stringify(processedContent));

      // Append main image if exists
      if (mainImage) {
        formData.append('images', mainImage);
      }

      const response = await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Blog post created successfully!');
      // Reset form or redirect
      // window.location.href = `/blogs/${response.data._id}`;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  // Render different content block types
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="mb-4 flex items-center">
            <input
              type="text"
              value={block.value}
              onChange={(e) => updateContentValue(index, e.target.value)}
              placeholder="Heading"
              className="w-full p-2 text-xl font-bold border rounded"
            />
            {renderBlockControls(index)}
          </div>
        );
      case 'subheading':
        return (
          <div className="mb-4 flex items-center">
            <input
              type="text"
              value={block.value}
              onChange={(e) => updateContentValue(index, e.target.value)}
              placeholder="Subheading"
              className="w-full p-2 text-lg font-semibold border rounded"
            />
            {renderBlockControls(index)}
          </div>
        );
      case 'image':
        return (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="font-medium">Image</span>
              {renderBlockControls(index)}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleContentImageChange(index, e)}
                  className="p-2 border rounded"
                />
                <span className="text-gray-500">OR</span>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={block.value.startsWith('data:image') ? '' : block.value}
                  onChange={(e) => handleImageUrlInput(index, e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
              </div>
              {block.value && (
                <div className="mt-2">
                  <img 
                    src={block.value} 
                    alt="Preview" 
                    className="max-w-full max-h-64 object-contain border rounded"
                    onError={(e) => {
                      if (!block.value.startsWith('data:image')) {
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      case 'paragraph':
      default:
        return (
          <div className="mb-4 flex items-start">
            <textarea
              value={block.value}
              onChange={(e) => updateContentValue(index, e.target.value)}
              placeholder="Paragraph content"
              className="w-full p-2 min-h-32 border rounded resize-y"
              rows={4}
            />
            {renderBlockControls(index)}
          </div>
        );
    }
  };

  // Render block controls (move up/down, delete)
  const renderBlockControls = (index) => {
    return (
      <div className="flex flex-col ml-2 space-y-1">
        <button
          type="button"
          onClick={() => moveBlockUp(index)}
          disabled={index === 0}
          className={`p-1 rounded-full ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Move Up"
        >
          <MoveUp size={18} />
        </button>
        <button
          type="button"
          onClick={() => moveBlockDown(index)}
          disabled={index === content.length - 1}
          className={`p-1 rounded-full ${index === content.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Move Down"
        >
          <MoveDown size={18} />
        </button>
        <button
          type="button"
          onClick={() => removeContentBlock(index)}
          className="p-1 text-red-500 rounded-full hover:bg-red-50"
          title="Remove Block"
        >
          <Trash2 size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-1">
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Reading Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 5 min read"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        {/* Featured Image */}
        <div>
          <label className="block mb-1 font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="w-full p-2 border rounded"
          />
          {mainImagePreview && (
            <div className="mt-2">
              <img 
                src={mainImagePreview} 
                alt="Featured preview" 
                className="max-h-64 object-contain" 
              />
            </div>
          )}
        </div>
        
        {/* Content Blocks */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Content</h2>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => addContentBlock('heading')}
                className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <PlusCircle size={16} className="mr-1" /> Heading
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('subheading')}
                className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <PlusCircle size={16} className="mr-1" /> Subheading
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('paragraph')}
                className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <PlusCircle size={16} className="mr-1" /> Paragraph
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('image')}
                className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <ImageIcon size={16} className="mr-1" /> Image
              </button>
            </div>
          </div>
          
          <div className="space-y-4 border p-4 rounded-md bg-gray-50">
            {content.map((block, index) => (
              <div key={index} className="bg-white p-3 rounded shadow-sm">
                {renderContentBlock(block, index)}
              </div>
            ))}
            
            {content.length === 0 && (
              <div className="text-center p-6 text-gray-500">
                Add content blocks using the buttons above
              </div>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;