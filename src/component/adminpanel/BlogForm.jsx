import { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
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
    const response = await axios.get(`/api/blogs/${id}`);
    setBlog(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
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

    if (id) {
      await axios.put(`/api/blogs/${id}`, formData);
    } else {
      await axios.post('/api/blogs', formData);
    }

    navigate('/blogs');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={handleInputChange}
        placeholder="Enter blog title"
      />
      <select
        name="category"
        value={blog.category}
        onChange={handleInputChange}
      >
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
      </select>
      
      {/* TinyMCE Editor with API key */}
      <Editor
        apiKey="jfqeefu7t3b4a8cpf1ph9ljax441no81qenakmkpl3f7qc4o" // Your TinyMCE API key here
        onInit={(evt, editor) => editorRef.current = editor}
        value={blog.content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'imagetools'
          ],
          toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter ' +
                   'alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
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

      <button type="submit">Save Blog</button>
    </form>
  );
};

export default BlogForm;
