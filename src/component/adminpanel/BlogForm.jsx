import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiSave, FiImage, FiX, FiTag, FiCheckCircle, FiClock } from 'react-icons/fi';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    duration: '5 min read',
    category: '',
    content: '',
    tags: [],
    status: 'draft',
    featuredImage: '',
  });
  const [newTag, setNewTag] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  // Categories list (you can fetch this from your backend)
  const categories = [
    'Technology', 'Business', 'Health', 'Lifestyle', 
    'Travel', 'Food', 'Education', 'Entertainment'
  ];

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/blogs/${id}`);
      setBlog(response.data);
      if (response.data.featuredImage) {
        setPreviewImage(response.data.featuredImage);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load blog post');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setBlog(prev => ({ ...prev, content }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Store the file for submission
      setBlog(prev => ({ ...prev, featuredImageFile: file }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !blog.tags.includes(newTag.trim())) {
      setBlog(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setBlog(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.title || !blog.category || !editorRef.current?.getContent()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('duration', blog.duration);
    formData.append('category', blog.category);
    formData.append('content', editorRef.current.getContent());
    formData.append('status', blog.status);
    
    // Add tags as JSON string
    formData.append('tags', JSON.stringify(blog.tags));
    
    // Add featured image if exists
    if (blog.featuredImageFile) {
      formData.append('featuredImage', blog.featuredImageFile);
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`/api/blogs/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Blog updated successfully!');
      } else {
        response = await axios.post('/api/blogs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Blog created successfully!');
      }
      navigate(`/blogs/${response.data.slug}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save blog');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="relative">
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            placeholder="Enter blog title..."
            className="w-full px-4 py-3 text-3xl font-bold border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 bg-transparent"
            required
          />
        </div>

        {/* Meta Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <FiImage className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text-sm">
                  {previewImage ? (
                    <div className="relative">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="max-h-80 mx-auto rounded-lg" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage('');
                          setBlog(prev => ({ ...prev, featuredImageFile: null }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600">Featured Image</p>
                      <p className="text-xs text-gray-500">Upload a high-quality image (recommended: 1200 x 630px)</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="featuredImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="featuredImage"
                  className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition"
                >
                  {previewImage ? 'Change Image' : 'Select Image'}
                </label>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={blog.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiClock className="mr-1" /> Reading Time
              </label>
              <input
                type="text"
                name="duration"
                value={blog.duration}
                onChange={handleInputChange}
                placeholder="e.g., 5 min read"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiTag className="mr-1" /> Tags
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-12 mb-2">
                {blog.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiCheckCircle className="mr-1" /> Status
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={blog.status === 'draft'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Draft</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={blog.status === 'published'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Published</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/blogs')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                  <FiSave className="mr-2" />
                  {isSaving ? 'Saving...' : id ? 'Update Blog' : 'Publish Blog'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="mt-8 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <Editor
            apiKey="your-tinymce-api-key" // Get a free API key from https://www.tiny.cloud/
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={blog.content}
            onEditorChange={handleEditorChange}
            init={{
              height: 600,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'imagetools'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | image | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              images_upload_handler: async (blobInfo, success, failure) => {
                try {
                  const formData = new FormData();
                  formData.append('image', blobInfo.blob(), blobInfo.filename());
                  
                  const response = await axios.post('/api/blogs/upload-image', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                  
                  success(response.data.location);
                } catch (err) {
                  failure('Image upload failed');
                }
              },
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;