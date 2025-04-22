import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type
    });
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        visible: false
      }));
    }, 5000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Post data to your API endpoint
    try {
      await axios.post("https://apis.innobrains.pk/api/contact", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        number: formData.phone,
        message: formData.message,
      });
      
      // Show success toast instead of alert
      showToast("Message sent successfully!");
      
      // Reset form fields after submission
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
      // Show error toast instead of alert
      showToast("There was an error submitting the form. Please try again.", "error");
    }
  };

  // Toast notification component
  const Toast = () => {
    if (!toast.visible) return null;

    // Default styles for success toast
    let bgColor = "bg-[#F8AF2A]";
    let textColor = "text-white";
    let icon = "✓";
    
    // Modify styles for error toast
    if (toast.type === "error") {
      bgColor = "bg-red-500";
      icon = "✕";
    }

    return (
      <div className={`fixed top-6 right-6 z-50 flex items-center shadow-lg rounded-lg px-4 py-3 ${bgColor} ${textColor} animate-fade-in`}>
        <div className="flex items-center">
          <span className="flex items-center justify-center mr-2 w-6 h-6 text-lg font-bold">{icon}</span>
          <p className="font-medium">{toast.message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-[#ECF5FF] items-center justify-center px-6 py-12 lg:py-20 relative">
      {/* Toast Component */}
      <Toast />
      
      {/* Header Section */}
      <div className="w-full max-w-7xl px-10 text-center lg:text-left">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[#101010] leading-tight">
          Our Specialists Are <br className="hidden lg:block" /> Waiting To Help You
        </h2>
        <p className="text-[#787878] text-lg">
          We'd love to discuss your data and requirements. Drop us a message and we'll get back to you shortly.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-7xl bg-[#ECF5FF] px-10 rounded-md mt-6">
        <form onSubmit={handleSubmit}>
          {/* Name and Last Name */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-full px-4 py-3 border border-black bg-[#ECF5FF] focus:outline-none focus:border-[#103153]"
                type="text"
                id="firstName"
                aria-label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full px-4 py-3 border border-black bg-[#ECF5FF] focus:outline-none focus:border-[#103153]"
                type="text"
                id="lastName"
                aria-label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email and Phone Number */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-black bg-[#ECF5FF] focus:outline-none focus:border-[#103153]"
                type="email"
                id="email"
                aria-label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-3 border border-black bg-[#ECF5FF] focus:outline-none focus:border-[#103153]"
                type="tel"
                id="phone"
                aria-label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 border border-black bg-[#ECF5FF] focus:outline-none focus:border-[#103153]"
              id="message"
              rows="5"
              aria-label="Message"
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="termsAccepted"
              className="mr-3 h-5 w-5 border-black bg-white rounded focus:ring-[#103153]"
              aria-label="Accept Terms and Conditions"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label htmlFor="termsAccepted" className="text-gray-700 text-sm">
              I accept the Terms
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-[#F8AF2A] text-lg font-semibold py-2 px-5 rounded-full hover:bg-[#ab7a1f] transition duration-300"
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