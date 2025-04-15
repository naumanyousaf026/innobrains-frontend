import { useState } from "react";

export default function AboutForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    aboutTitle: "",
    aboutDescription: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="w-[80%] ml-auto flex justify-center items-center p-6">
      <div className="w-full bg-white rounded-xl p-8 border border-gray-300 flex flex-col justify-between">
        <h2 className="text-3xl nunito-sans font-extrabold text-gray-800 mb-5 text-center">
          About Section Form
        </h2>

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
              className="w-full bg-[#103153] text-white font-semibold py-2 nunito-sans rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Save Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}