import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const RefundPolicy = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/refund");
        if (!response.ok) {
          throw new Error("Failed to fetch policy data");
        }
        const data = await response.json();
        setPolicyData(data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading policy information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-6 border border-red-200 rounded-lg bg-red-50">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Policy</h2>
          <p className="text-gray-700">{error}</p>
          <p className="mt-4">Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }

  // Generate sections array from policyData
  const sections = policyData?.items.map(item => item.heading) || [];

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
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Policy Sections</h2>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={index}>
                <a
                  href={`#section-${index + 1}`}
                  className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                >
                  {index + 1}. {section}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 text-gray-800 scroll-smooth">
          <h1 className="text-3xl font-bold mb-6 text-left">{policyData.title}</h1>

          <p className="mb-4 text-left">
            {policyData.description}
          </p>

          {policyData.items.map((item, index) => (
            <section id={`section-${index + 1}`} className="mb-10" key={index}>
              <h2 className="text-xl font-semibold mt-6 mb-2 text-left">
                {index + 1}. {item.heading}
              </h2>
              
              {item.description && (
                <p className="mb-4 text-left">
                  {item.description}
                </p>
              )}
              
              {item.points && item.points.length > 0 && (
                <ul className="list-disc list-inside mb-4 space-y-1 text-left">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default RefundPolicy;