import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          {error || 'Blog post not found'}
        </div>
      </div>
    );
  }

  // Render each content block based on its type
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {block.value}
          </h2>
        );
      case 'subheading':
        return (
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {block.value}
          </h3>
        );
      case 'image':
        return (
          <div key={index} className="my-6">
            <img 
              src={block.value.startsWith('http') ? block.value : `/blogImages/${block.value}`}
              alt="Blog content" 
              className="max-w-full rounded-lg mx-auto"
            />
          </div>
        );
      case 'paragraph':
      default:
        return (
          <p key={index} className="my-4 leading-relaxed">
            {block.value}
          </p>
        );
    }
  };

  return (
    <article className="max-w-3xl mx-auto p-6">
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.duration}</span>
          <span>•</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {blog.images && blog.images.length > 0 && (
        <div className="mb-8">
          <img
            src={blog.images[0].startsWith('http') ? blog.images[0] : `/blogImages/${blog.images[0]}`}
            alt="Featured"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose max-w-none">
        {blog.content.map(renderContentBlock)}
      </div>
    </article>
  );
};

export default BlogView;