import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed with `npm install axios`

function ContactInfoForm() {
  const [formData, setFormData] = useState({
    email: "",
    location: "",
    phone: "",
    hours: "",
  });
  const [contactId, setContactId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  // Fetch existing contact info when component mounts
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://apis.innobrains.pk/api/contact-info");
      if (response.data && response.status === 200) {
        setFormData({
          email: response.data.email || "",
          location: response.data.location || "",
          phone: response.data.phone || "",
          hours: response.data.hours || "",
        });
        setContactId(response.data._id);
        setCreateMode(false);
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
      // If 404, it means no contact info exists yet, so we'll be in create mode
      if (error.response && error.response.status === 404) {
        setCreateMode(true);
      }
    } finally {
      setLoading(false);
    }
  };

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
      setLoading(true);
      let response;
      
      if (createMode) {
        // Create new contact info
        response = await axios.post(
          "https://apis.innobrains.pk/api/contact-info",
          formData
        );
        if (response.status === 201) {
          setContactId(response.data._id);
          setCreateMode(false);
        }
      } else {
        // Update existing contact info with ID
        response = await axios.put(
          `https://apis.innobrains.pk/api/contact-info/${contactId}`,
          formData
        );
      }
      
      if (response.status === 200 || response.status === 201) {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        alert("Failed to update contact info. Please try again.");
      }
    } catch (error) {
      console.error("Error updating contact info:", error);
      alert(
        "An error occurred while updating the information. Please check your input or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ml-auto w-full p-6">
      <div className="w-full bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            {createMode ? "Create Contact Information" : "Update Contact Information"}
          </h2>
          {loading && <p className="text-gray-600">Loading current information...</p>}
          {updateSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Contact information {createMode ? "created" : "updated"} successfully!
            </div>
          )}
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-20 bg-[#103153] text-white font-bold py-3 rounded-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading ? "Processing..." : createMode ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactInfoForm;