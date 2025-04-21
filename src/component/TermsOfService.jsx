import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const sections = [
  "Acceptance of Terms",
  "Use of the Website",
  "Intellectual Property",
  "User Content",
  "Disclaimers",
  "Limitation of Liability",
  "Modifications",
  "Termination",
  "Governing Law",
  "Contact Us",
];

const TermsOfService = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <p className="mb-4">
            Welcome to <strong>Innobrains Technologies</strong> ("Company", "we", "our", "us").
            These Terms of Service ("Terms") govern your use of our website located at{" "}
            <a href="https://www.innobrains.pk" className="text-blue-600 underline">www.innobrains.pk</a> and any related services provided by us.
          </p>

          {/* Section Content */}
          {sections.map((title, index) => (
            <section key={index} id={`section-${index + 1}`} className="mb-10">
              <h2 className="text-xl font-semibold mt-6 mb-2 text-left">
                {index + 1}. {title}
              </h2>
              <p className="text-gray-700 text-left">
                This section describes our terms regarding: <strong>{title}</strong>. Please replace this placeholder with real terms and conditions content.
              </p>
            </section>
          ))}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default TermsOfService;
