import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed with `npm install axios`

function ContactInfoForm() {
  const [formData, setFormData] = useState({
    email: "",
    location: "",
    phone: "",
    hours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://apis.innobrains.pk/api/contact-info",
        formData
      );
      if (response.status === 200) {
        alert("Contact info submitted successfully!");
        setFormData({
          email: "",
          location: "",
          phone: "",
          hours: "",
        });
      } else {
        alert("Failed to submit contact info. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact info:", error);
      alert(
        "An error occurred while submitting the form. Please check your input or try again later."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ml-auto bg-[#ECECEE] lg:w-[80%] p-6">
      <div className="w-[100%] bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Contact Info Form
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-lg font-medium text-[#103153] mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-lg font-medium text-[#103153] mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-[#103153] mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium text-[#103153] mb-2"
              htmlFor="hours"
            >
              Working Hours
            </label>
            <input
              type="text"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 bg-transparent"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-20 bg-[#103153]  text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactInfoForm;
