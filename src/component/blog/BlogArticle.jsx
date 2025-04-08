import React from "react";
import blogimg from "../../images/WordPress.png";
import Header from "../Header";
import Footer from "../Footer";

const BlogArticle = () => {
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
              What is Web Development and Why It Matters in 2025
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              Discover why a strong web presence is vital in today’s digital landscape and how modern web development shapes the future.
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
              <p>April 5, 2025 · 6 min read</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={blogimg}
              alt="Web Development"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-gray-200"
            />
          </div>

          {/* Article Content */}
          <article className="prose lg:prose-xl prose-slate max-w-none">
            <h2>Understanding Web Development</h2>
            <p>
              Web development involves the creation, design, and maintenance of websites. It's a multi-faceted field that encompasses various practices and technologies.
            </p>

            <h3>Three Pillars of Web Development</h3>
            <ul>
              <li><strong>Front-End:</strong> What users see (HTML, CSS, JavaScript).</li>
              <li><strong>Back-End:</strong> Server-side logic, databases, APIs.</li>
              <li><strong>Full-Stack:</strong> Combination of both front and back end.</li>
            </ul>

            <h2>The Importance of Web Development in 2025</h2>
            <p>
              A website is often the first impression. It must be fast, responsive, and visually appealing to gain trust and drive conversions.
            </p>

            <h3>Why Your Business Needs a Strong Web Presence</h3>
            <p>
              A well-crafted website boosts credibility, user experience, and business growth.
            </p>

            <h2>Trends Shaping the Future</h2>
            <ul>
              <li><strong>⚡ Ultra-fast loading:</strong> Keep users engaged.</li>
              <li><strong>📱 Mobile-first:</strong> Design for all devices.</li>
              <li><strong>🧠 AI-driven interfaces:</strong> Personalized experiences.</li>
              <li><strong>🔐 Secure architecture:</strong> Protect user data.</li>
            </ul>

            <h2>Partner with Innobrains</h2>
            <p>
              We build performance-driven websites for businesses of all sizes. Let’s bring your digital vision to life.
            </p>
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
            <a href="/blog" className="text-blue-600 font-medium hover:underline">← Back to Blog</a>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Articles</h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-4">
              <img src={blogimg} alt="Front-End" className="w-16 h-16 rounded-lg object-cover" />
              <a href="/blog/article-1" className="text-blue-700 font-medium hover:underline">
                Future of Front-End Development in 2025
              </a>
            </li>
            <li className="flex items-center gap-4">
              <img src={blogimg} alt="Back-End" className="w-16 h-16 rounded-lg object-cover" />
              <a href="/blog/article-2" className="text-blue-700 font-medium hover:underline">
                Back-End Technologies You Need to Know
              </a>
            </li>
            <li className="flex items-center gap-4">
              <img src={blogimg} alt="AI" className="w-16 h-16 rounded-lg object-cover" />
              <a href="/blog/article-3" className="text-blue-700 font-medium hover:underline">
                How AI is Changing Web Development
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>

<Footer />
    </>
  );
};

export default BlogArticle;