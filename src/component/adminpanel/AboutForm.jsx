import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    aboutTitle: "",
    aboutDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [aboutUsId, setAboutUsId] = useState(null);

  useEffect(() => {
    // Fetch existing about us data when component mounts
    const fetchAboutUsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://apis.innobrains.pk/api/aboutus");
        if (response.data && response.data.length > 0) {
          const data = response.data[0]; // Get the first record
          setFormData({
            title: data.title || "",
            description: data.description || "",
            aboutTitle: data.aboutTitle || "",
            aboutDescription: data.aboutDescription || "",
          });
          setAboutUsId(data._id);
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error fetching about us data:", error);
        setMessage({
          text: "Failed to load existing data. Please try again.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      let response;
      
      if (isEditing && aboutUsId) {
        // If we're editing an existing record, use PUT to update
        response = await axios.put(
          `https://apis.innobrains.pk/api/aboutus/${aboutUsId}`,
          formData
        );
        setMessage({ text: "About Us content updated successfully!", type: "success" });
      } else {
        // If it's a new record, use POST
        response = await axios.post(
          "https://apis.innobrains.pk/api/aboutus",
          formData
        );
        setAboutUsId(response.data._id);
        setIsEditing(true);
        setMessage({ text: "About Us content saved successfully!", type: "success" });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({
        text: "Failed to save data. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full bg-white rounded-xl p-8 border border-gray-300 flex flex-col justify-between">
        <h2 className="text-3xl nunito-sans font-extrabold text-gray-800 mb-5 text-center">
          About Section Form
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-[#103153] border-r-transparent border-b-[#103153] border-l-transparent"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter main title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter description"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">About Title</label>
              <input
                type="text"
                name="aboutTitle"
                value={formData.aboutTitle}
                onChange={handleChange}
                required
                placeholder="Enter about title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">About Description</label>
              <textarea
                name="aboutDescription"
                value={formData.aboutDescription}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter about description"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#103153] text-white font-semibold py-2 nunito-sans rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isEditing ? "Update Data" : "Save Data"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}