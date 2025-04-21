import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const sections = [
  "Eligibility for Refunds",
  "Non-Refundable Items",
  "Cancellation Policy",
  "How to Request a Refund",
  "Refund Processing",
  "Contact Us",
];

const RefundPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-left">Refund Policy</h1>

          <p className="mb-4 text-left">
            At <strong>Innobrains Technologies</strong>, we strive to ensure our clients are fully satisfied with our services. However, we understand that there may be circumstances where a refund is required. Please read our refund policy carefully to understand when refunds are applicable.
          </p>

          <section id="section-1" className="mb-10">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-left">1. Eligibility for Refunds</h2>
            <ul className="list-disc list-inside mb-4 space-y-1 text-left">
              <li>Refunds are only applicable for services purchased directly from <strong>www.innobrains.pk</strong>.</li>
              <li>A valid reason must be provided for requesting a refund.</li>
              <li>Requests must be made within 7 days of the original transaction date.</li>
            </ul>
          </section>

          <section id="section-2" className="mb-10">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-left">2. Non-Refundable Items</h2>
            <p className="mb-4 text-left">The following are non-refundable:</p>
            <ul className="list-disc list-inside mb-4 space-y-1 text-left">
              <li>Custom-developed software or solutions</li>
              <li>Domain registration and third-party hosting services</li>
              <li>Projects that have been approved or delivered</li>
              <li>Any service with more than 30% completion</li>
            </ul>
          </section>

          <section id="section-3" className="mb-10">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-left">3. Cancellation Policy</h2>
            <p className="mb-4 text-left">
              You may cancel your order within 24 hours of placement, provided work has not started. If work has commenced, only partial refunds may be applicable based on work completed.
            </p>
          </section>

          <section id="section-4" className="mb-10">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-left">4. How to Request a Refund</h2>
            <p className="mb-4 text-left">
              To request a refund, please email us at{" "}
              <a href="mailto:info@innobrains.pk" className="text-blue-600 underline">
                info@innobrains.pk
              </a>{" "}
              with the following details:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 text-left">
              <li>Your full name and contact information</li>
              <li>Order or invoice number</li>
              <li>A detailed explanation for your refund request</li>
            </ul>
          </section>

          <section id="section-5" className="mb-10">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-left">5. Refund Processing</h2>
            <p className="mb-4 text-left">
              Approved refunds will be processed within 7-10 business days and credited to your original method of payment. Processing time may vary depending on your bank or payment provider.
            </p>
          </section>

          <section id="section-6" className="mb-10">
            <h2 className="text-xl font-semibold mt-6 mb-2 text-left">6. Contact Us</h2>
            <p className="text-left">
              If you have any questions about our refund policy, please don’t hesitate to contact us at:{" "}
              <a href="mailto:info@innobrains.pk" className="text-blue-600 underline">
                info@innobrains.pk
              </a>
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default RefundPolicy;