import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [policyData, setPolicyData] = useState({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://apis.innobrains.pk/api/privacypolicy');
        if (!response.ok) {
          throw new Error('Failed to fetch privacy policy data');
        }
        const data = await response.json();
        setPolicyData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      <Header />

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden px-4 mt-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow"
        >
          {showSidebar ? "Hide Menu" : "Show Menu"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-10">
        {/* Sidebar */}
        <aside
          className={`${
            showSidebar ? "block" : "hidden"
          } md:block w-64 flex-shrink-0 sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm`}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Policy Sections</h2>
          {loading ? (
            <p className="text-gray-600 text-sm">Loading sections...</p>
          ) : error ? (
            <p className="text-red-600 text-sm">Error loading sections</p>
          ) : (
            <ul className="space-y-2">
              {policyData.sections.map((section, index) => (
                <li key={section._id}>
                  <a
                    href={`#section-${index + 1}`}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 text-gray-800 scroll-smooth">
          <h1 className="text-3xl font-bold mb-6 text-left">Privacy Policy</h1>

          <p className="mb-4 text-left">
            At <strong>Innobrains Technologies</strong> ("Company", "we", "us", or "our"), we take your privacy seriously. This Privacy Policy outlines how we collect, use, protect, and disclose your information when you use our website located at{" "}
            <a href="https://www.innobrains.pk" className="text-blue-600 underline">www.innobrains.pk</a>.
          </p>

          {loading ? (
            <div className="py-10 text-center">
              <p className="text-gray-600">Loading privacy policy content...</p>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-red-600">Error loading privacy policy content. Please try again later.</p>
            </div>
          ) : (
            policyData.sections.map((section, index) => (
              <section key={section._id} id={`section-${index + 1}`} className="mb-10">
                <h2 className="text-xl font-semibold mt-6 mb-2 text-left">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-gray-700 text-left">
                  {section.content}
                </p>
              </section>
            ))
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
