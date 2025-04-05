import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
  });

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // "success" or "error"

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
    
    // Hide the toast after 5 seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 5000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend API
      const response = await axios.post(
        "https://apis.innobrains.pk/api/contact",
        formData
      );
      
      // Show success toast
      showToast("Your message has been sent successfully!");
      
      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        message: "",
      });
    } catch (error) {
      // Show error toast
      showToast("Failed to send the message. Please try again.", "error");
    }
  };

  // Toast notification component
  const Toast = () => {
    if (!isToastVisible) return null;

    // Default styles for success toast
    let bgColor = "bg-[#F8AF2A]";
    let textColor = "text-white";
    let icon = "✓";
    
    // Modify styles for error toast
    if (toastType === "error") {
      bgColor = "bg-red-500";
      icon = "✕";
    }

    return (
      <div className={`fixed top-6 right-6 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg ${bgColor} ${textColor} transition-opacity duration-300`}>
        <div className="mr-3 text-xl font-bold">{icon}</div>
        <p className="text-sm font-medium">{toastMessage}</p>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center px-4 bg-[#F9FAFB] py-16 relative">
      {/* Toast Notification */}
      <Toast />
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-600 mt-4 mb-12 text-lg">
            Our friendly team would love to hear from you.
          </p>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            onSubmit={handleSubmit}
          >
            {/* First Name */}
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-[#101010]  font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md focus:outline-none focus:border-[#103153]"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-[#101010]  font-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md focus:outline-none focus:border-[#103153]"
                required
              />
            </div>

            {/* Email */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label htmlFor="email" className="text-[#101010]  font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md focus:outline-none focus:border-[#103153]"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label htmlFor="number" className="text-[#101010]  font-semibold">
                Phone Number
              </label>
              <input
                type="text"
                id="number"
                value={formData.number}
                onChange={handleChange}
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2  rounded-md focus:outline-none focus:border-[#103153]"
                required
              />
            </div>

            {/* Message */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label
                htmlFor="message"
                className="text-[#101010]  font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-[#5C5C5C] bg-[#F9FAFB] p-2 rounded-md h-32 focus:outline-none focus:border-[#103153]"
                required
              ></textarea>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center col-span-1 md:col-span-2">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-gray-600">
                I accept the Terms
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="block bg-[#F8AF2A] text-white px-3 py-2 rounded-full w-40 mt-6 text-center text-lg font-medium transition duration-300 ease-in-out hover:bg-yellow-600"
            >
              Contact Us
            </button>
          </form>
        </div>

        {/* Right Side: Map */}
        <div className="h-full">
          <iframe
            className="w-full h-full min-h-[450px] rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.4842714007123!2d72.36365137481681!3d31.26269725982886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3923a3b76e01b86d%3A0xdda9568c468f6252!2sInnobrains%20technologies!5e0!3m2!1sen!2s!4v1726726087354!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;