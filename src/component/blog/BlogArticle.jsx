import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BlogArticle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://apis.innobrains.pk/api/blog/${slug}`);
      setBlog(response.data);
      
      // Fetch related blogs in the same category
      if (response.data.category) {
        fetchRelatedBlogs(response.data.category, response.data._id);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog');
      setLoading(false);
      console.error('Error fetching blog:', err);
    }
  };

  const fetchRelatedBlogs = async (category, currentBlogId) => {
    try {
      const response = await axios.get(`https://apis.innobrains.pk/api/blog?category=${category}&limit=3`);
      // Filter out the current blog
      const filtered = response.data.blogs.filter(blog => blog._id !== currentBlogId);
      setRelatedBlogs(filtered.slice(0, 3)); // Limit to 3 related blogs
    } catch (err) {
      console.error('Error fetching related blogs:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Ensure full image URL handling (absolute URL)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-image.jpg"; // default image if no image is available

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Blog</h2>
          <p className="mt-2 text-gray-600">{error || 'Blog not found'}</p>
          <Link to="/blog" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
            ← Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blogs
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {blog.category}
              </span>
              {blog.status === 'draft' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              )}
              <span className="text-gray-500 text-sm">{blog.duration}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="text-gray-600 text-sm">
                <span>By {blog.author || 'Admin'}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {blog.featuredImage && (
            <div className="mb-8">
              <img
                src={getImageUrl(blog.featuredImage)}
                alt={blog.title}
                className="w-full h-auto rounded-lg object-cover"
                style={{ maxHeight: '500px' }}
                onError={(e) => e.target.src = "/images/default-image.jpg"} // Handle image error
              />
            </div>
          )}

          <div 
            className="prose max-w-none prose-indigo prose-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </article>

        {/* Admin Actions */}
        <div className="mt-12 border-t pt-6 flex justify-end space-x-4">
          <Link
            to={`/admin/blogs/edit/${blog._id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit Blog
          </Link>
          
          <button
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this blog?')) {
                try {
                  await axios.delete(`https://apis.innobrains.pk/api/blog/${blog._id}`);
                  window.location.href = '/blogs';
                } catch (err) {
                  alert('Failed to delete blog');
                  console.error('Error deleting blog:', err);
                }
              }
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Blog
          </button>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  to={`/blog/${relatedBlog._id}`} 
                  key={relatedBlog._id}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {relatedBlog.featuredImage && (
                      <img 
                        src={getImageUrl(relatedBlog.featuredImage)} 
                        alt={relatedBlog.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => e.target.src = "/images/default-image.jpg"} // Handle image error for related blogs
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(relatedBlog.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogArticle;
