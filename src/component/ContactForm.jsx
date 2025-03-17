import React, { useState } from "react";
import axios from "axios"; // To handle API requests

function ContactForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Post data to your API endpoint
    try {
      await axios.post("https://apis.innobrains.pk/api/visitor/submit", {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        email: formData.email,
        number: formData.phone,
        message: formData.message,
      });

      alert("Message sent successfully!");
      // Optionally reset form fields after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        termsAccepted: false,
      });
    } catch (error) {
      console.error("Error submitting form data", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 lg:p-16  rounded shadow-lg space-y-8 lg:space-y-0">
      {/* Heading Section */}
      <div className="text-center w-full lg:w-2/3">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
          Our Specialists Are Waiting To Help You
        </h2>
        <p className="text-gray-600 text-lg">
          We'd love to discuss your data and requirements. Drop us a message and
          we'll get back to you shortly.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/3 p-8 bg-gray-50 rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Name and Last Name */}
          <div className="flex flex-col lg:flex-row lg:space-x-4 mb-6">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <label
                className="block text-sm font-semibold mb-2 text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label
                className="block text-sm font-semibold mb-2 text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email and Phone Number */}
          <div className="flex flex-col lg:flex-row lg:space-x-4 mb-6">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <label
                className="block text-sm font-semibold mb-2 text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label
                className="block text-sm font-semibold mb-2 text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2 text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                className="form-checkbox"
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <span className="ml-2 text-gray-600">
                I accept the terms and conditions.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
