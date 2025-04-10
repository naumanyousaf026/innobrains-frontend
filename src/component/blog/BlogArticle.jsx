import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
// import blogDefaultImg from "../../images/WordPress.png";
import Header from "../Header";
import Footer from "../Footer";

const BlogArticle = () => {
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // First check if blog data was passed via navigation state
    if (location.state && location.state.blogData) {
      setBlog(location.state.blogData);
      setLoading(false);
      fetchRelatedBlogs(location.state.blogData.category);
    } else if (id) {
      // If not found in state, fetch it from API
      fetchBlogData();
    }
  }, [id, location.state]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch(`https://apis.innobrains.pk/api/blog/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data = await response.json();
      setBlog(data);
      fetchRelatedBlogs(data.category);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blog data", error);
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (category) => {
    try {
      const response = await fetch(`https://apis.innobrains.pk/api/blog?category=${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch related blogs");
      }
      const data = await response.json();
      // Filter out current blog and limit to 3
      const filteredData = data
        .filter(item => item.id !== id)
        .slice(0, 3);
      setRelatedBlogs(filteredData);
    } catch (error) {
      console.error("Failed to fetch related blogs", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading blog article...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Blog not found</div>
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
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-8 shadow-md mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {blog.title}
              </h1>
              <p className="text-lg text-gray-700 mt-4">
                {blog.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <img
                src="https://i.pravatar.cc/48"
                alt="Author Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
              <div>
                <p className="font-semibold text-gray-700">Innobrains Technologies</p>
                <p>{blog.date || "April 5, 2025"} · {blog.duration || "6 min read"}</p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={blog.image ? `https://apis.innobrains.pk${blog.image}` : blogDefaultImg}
                alt={blog.title}
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-gray-200"
              />
            </div>

            {/* Article Content */}
            <article className="prose lg:prose-xl prose-slate max-w-none">
              {/* If blog.content exists, use it, otherwise use static content */}
              {blog.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <>
                  <h2>Understanding {blog.title}</h2>
                  <p>
                    {blog.description}
                  </p>

                  <h3>Key Points</h3>
                  <ul>
                    <li><strong>Industry Focus:</strong> {blog.category}</li>
                    <li><strong>Latest Trends:</strong> Staying updated with industry standards</li>
                    <li><strong>Best Practices:</strong> Following proven methodologies</li>
                  </ul>

                  <p>
                    This article explores the importance of {blog.title} in today's digital landscape.
                  </p>
                </>
              )}
            </article>

            {/* Share & Author Section */}
            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex gap-4 mb-8">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Twitter</button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">LinkedIn</button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <img src="https://i.pravatar.cc/100" className="w-16 h-16 rounded-full" alt="Author" />
                <div>
                  <p className="font-semibold text-gray-900">Ali from Innobrains</p>
                  <p className="text-gray-600 text-sm">Front-End Developer who loves clean UI and future tech trends.</p>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link to="/blog" className="text-blue-600 font-medium hover:underline">← Back to Blog</Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Articles</h3>
            {relatedBlogs.length > 0 ? (
              <ul className="space-y-5">
                {relatedBlogs.map((relatedBlog) => (
                  <li key={relatedBlog.id} className="flex items-center gap-4">
                    <img 
                      src={relatedBlog.image ? `https://apis.innobrains.pk${relatedBlog.image}` : blogDefaultImg} 
                      alt={relatedBlog.title} 
                      className="w-16 h-16 rounded-lg object-cover" 
                    />
                    <Link 
                      to={`/blog/${relatedBlog.id}`}
                      state={{ blogData: relatedBlog }}
                      className="text-blue-700 font-medium hover:underline"
                    >
                      {relatedBlog.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  {/* <img src={blogDefaultImg} alt="Front-End" className="w-16 h-16 rounded-lg object-cover" /> */}
                  <a href="/blog/article-1" className="text-blue-700 font-medium hover:underline">
                    Future of Front-End Development in 2025
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  {/* <img src={blogDefaultImg} alt="Back-End" className="w-16 h-16 rounded-lg object-cover" /> */}
                  <a href="/blog/article-2" className="text-blue-700 font-medium hover:underline">
                    Back-End Technologies You Need to Know
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  {/* <img src={blogDefaultImg} alt="AI" className="w-16 h-16 rounded-lg object-cover" /> */}
                  <a href="/blog/article-3" className="text-blue-700 font-medium hover:underline">
                    How AI is Changing Web Development
                  </a>
                </li>
              </ul>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogArticle;