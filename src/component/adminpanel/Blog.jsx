import { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    const response = await axios.get(`/api/blogs?page=${currentPage}`);
    setBlogs(response.data.blogs);
  };

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
      <button onClick={() => setCurrentPage(prev => prev + 1)}>Next Page</button>
    </div>
  );
};

export default Blog;
