import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const sections = [
  "Information We Collect",
  "How We Use Your Information",
  "Sharing of Information",
  "Cookies and Tracking",
  "Data Security",
  "Third-Party Links",
  "Data Retention",
  "Your Rights",
  "Privacy of Children",
  "Updates to This Policy",
  "Contact Information",
];

const PrivacyPolicy = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
          <h1 className="text-3xl font-bold mb-6 text-left">Privacy Policy</h1>

          <p className="mb-4 text-left">
            At <strong>Innobrains Technologies</strong> ("Company", "we", "us", or "our"), we take your privacy seriously. This Privacy Policy outlines how we collect, use, protect, and disclose your information when you use our website located at{" "}
            <a href="https://www.innobrains.pk" className="text-blue-600 underline">www.innobrains.pk</a>.
          </p>

          {sections.map((title, index) => (
            <section key={index} id={`section-${index + 1}`} className="mb-10">
              <h2 className="text-xl font-semibold mt-6 mb-2 text-left">
                {index + 1}. {title}
              </h2>
              <p className="text-gray-700 text-left">
                {/* Replace with actual section content */}
                This section explains our policy regarding: <strong>{title}</strong>. Customize this section with real information.
              </p>
            </section>
          ))}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
