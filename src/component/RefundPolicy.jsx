import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const RefundPolicy = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [policyData, setPolicyData] = useState({
    title: "",
    description: "",
    items: [] // Initialize items as an empty array
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRefundPolicy = async () => {
      try {
        const response = await fetch("https://apis.innobrains.pk/api/refund");
        if (!response.ok) {
          throw new Error("Failed to fetch refund policy data");
        }
        const data = await response.json();
        
        // Ensure data has the expected structure
        setPolicyData({
          title: data?.title || "",
          description: data?.description || "",
          items: Array.isArray(data?.items) ? data.items : []
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRefundPolicy();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-lg">Loading refund policy...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-lg text-red-600">Error loading refund policy: {error}</p>
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
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Policy Sections</h2>
          <ul className="space-y-2">
            {(policyData.items || []).map((item, index) => (
              <li key={index}>
                <a
                  href={`#section-${index + 1}`}
                  className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                >
                  {index + 1}. {item?.heading || 'Section'}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 text-gray-800 scroll-smooth">
          <h1 className="text-3xl font-bold mb-6 text-left">{policyData.title || 'Refund Policy'}</h1>

          <p className="mb-4 text-left">
            {policyData.description || ''}
          </p>

          {(policyData.items || []).map((item, index) => (
            <section id={`section-${index + 1}`} className="mb-10" key={item?._id || index}>
              <h2 className="text-xl font-semibold mt-6 mb-2 text-left">
                {index + 1}. {item?.heading || 'Section'}
              </h2>
              {item?.description && <p className="mb-4 text-left">{item.description}</p>}
              {item?.points && Array.isArray(item.points) && item.points.length > 0 && (
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