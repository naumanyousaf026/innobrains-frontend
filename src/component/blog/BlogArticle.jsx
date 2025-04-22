import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";

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
      // Update to use the slug endpoint instead of the ID endpoint
      const response = await axios.get(`https://apis.innobrains.pk/api/blog/slug/${slug}`);
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
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Header />
        <div className="bg-gray-50 min-h-screen py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600">Error Loading Blog</h2>
              <p className="mt-2 text-gray-600">{error || 'Blog not found'}</p>
              <Link to="/blog" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                ← Back to blogs
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 text-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back to Blogs Link */}
            <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blogs
            </Link>
          
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-8 shadow-md mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                  {blog.category}
                </span>
                {blog.status === 'draft' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                )}
                <span className="text-gray-700 text-sm">{blog.duration || '5'} min read</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {blog.title}
              </h1>
              
              <p className="text-lg text-gray-700 mt-4">
                {blog.excerpt || 'Discover insights and knowledge in this comprehensive article.'}
              </p>
                          {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <img
                src="https://i.pravatar.cc/48"
                alt="Author Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
              <div>
                <p className="font-semibold text-gray-700">{blog.author || 'Innobrains Technologies'}</p>
                <p>{formatDate(blog.createdAt)} · {blog.duration || '5'} min read</p>
              </div>
            </div>
            </div>



            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="mb-8">
                <img
                  src={getImageUrl(blog.featuredImage)}
                  alt={blog.title}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-gray-200"
                  onError={(e) => e.target.src = "/images/default-image.jpg"}
                />
              </div>
            )}

            {/* Article Content */}
            <article className="prose lg:prose-xl prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </article>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share & Author */}
            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex gap-4 mb-8">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Twitter</button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">LinkedIn</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Articles</h3>
            
            {relatedBlogs.length > 0 ? (
              <ul className="space-y-5">
                {relatedBlogs.map((relatedBlog) => (
                  <li key={relatedBlog._id} className="flex items-center gap-4">
                    <img 
                      src={getImageUrl(relatedBlog.featuredImage)} 
                      alt={relatedBlog.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => e.target.src = "/images/default-image.jpg"}
                    />
                    <Link 
                      to={`/blog/${relatedBlog.slug}`} 
                      className="text-blue-700 font-medium hover:underline"
                    >
                      {relatedBlog.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No related articles found</p>
            )}
            
            {/* Newsletter Signup */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
              
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BlogArticle;