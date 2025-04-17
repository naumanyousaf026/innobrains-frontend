import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    category: '',
    status: 'draft',
    tags: [],
  });

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://apis.innobrains.pk/api/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setBlog(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('content', blog.content);
    formData.append('category', blog.category);
    formData.append('tags', JSON.stringify(blog.tags));
    formData.append('status', blog.status);

    try {
      if (id) {
        await axios.put(`https://apis.innobrains.pk/api/blog/${id}`, formData);
      } else {
        await axios.post('https://apis.innobrains.pk/api/blog', formData);
      }
      navigate('/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <div className="blog-form-container">
      <h2>{id ? 'Edit Blog' : 'Create New Blog'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={blog.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={blog.content}
            onChange={handleEditorChange}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'indent',
                'outdent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo'
              ],
              image: {
                toolbar: [
                  'imageStyle:full',
                  'imageStyle:side',
                  '|',
                  'imageTextAlternative'
                ],
                upload: {
                  types: ['jpeg', 'png', 'gif', 'jpg']
                }
              },
              // For image upload functionality
              ckfinder: {
                uploadUrl: 'https://apis.innobrains.pk/api/blog/upload-image'
              }
            }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={blog.status}
            onChange={handleInputChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {id ? 'Update' : 'Publish'} Blog
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate('/blogs')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;