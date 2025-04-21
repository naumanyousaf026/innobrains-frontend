import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const TermsOfService = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch terms data from API
    const fetchTermsData = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/terms");
        if (!response.ok) {
          throw new Error("Failed to fetch terms data");
        }
        const data = await response.json();
        setTermsData(data[0]); // Taking the first item from the array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-10"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-red-700 text-xl font-semibold mb-2">Error Loading Terms</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Mobile Sidebar Toggle */}
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
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Terms Sections</h2>
          <ul className="space-y-2">
            {termsData?.sections.map((section, index) => (
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
        </aside>
        {/* Main Content */}
        <main className="flex-1 text-gray-800 scroll-smooth">
          <h1 className="text-3xl font-bold mb-6">{termsData?.title}</h1>
          <p className="mb-4">{termsData?.intro}</p>
          {/* Section Content */}
          {termsData?.sections.map((section, index) => (
            <section key={section._id} id={`section-${index + 1}`} className="mb-10">
              <h2 className="text-xl font-semibold mt-6 mb-2 text-left">
                {index + 1}. {section.title}
              </h2>
              <p className="text-gray-700 text-left">{section.content}</p>
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;