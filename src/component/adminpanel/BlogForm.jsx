import React, { useState, useEffect } from "react";
import { faCamera, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogForm = ({ blog, onClose }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({}); // State to hold error messages

  // Load existing blog data for editing
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDuration(blog.duration);
      setCategory(blog.category);
      setDescription(blog.description);
      setImage(null); // Reset image state for editing
    }
  }, [blog]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on change
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError((prev) => ({
          ...prev,
          image: "Please upload a valid image file.",
        }));
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError((prev) => ({ ...prev, image: "" })); // Clear error if image is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("category", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    // Simple validation check
    const newError = {};
    if (!title) newError.title = "Title is required.";
    if (!duration) newError.duration = "Duration is required.";
    if (!category) newError.category = "Category is required.";
    if (!description) newError.description = "Description is required.";
    if (!image) newError.image = "Image is required.";

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return; // Prevent submission if there are errors
    }

    try {
      const response = blog
        ? await fetch(`https://apis.innobrains.pk/api/blog/${blog._id}`, {
            method: "PUT",
            body: formData,
          })
        : await fetch("https://apis.innobrains.pk/api/blog", {
            method: "POST",
            body: formData,
          });

      if (response.ok) {
        onClose(); // Close the form and refresh data
      } else {
        console.error("Failed to save blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg mx-auto"
    >
      {/* Top Back Button */}
      <button
        type="button"
        onClick={onClose}
        className="text-gray-600 hover:text-blue-500 transition duration-200 rounded-lg mb-4"
      >
        <FontAwesomeIcon icon={faLeftLong} />
      </button>

      {/* Image Upload Section */}
      <div className="w-16 h-16 mx-auto p-3 rounded-full bg-[#ECECEE] text-center mb-4">
        <label className="block relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            required
          />
          <div className="border bg-[#ECECEE] rounded-full flex justify-center items-center h-full w-full">
            <FontAwesomeIcon icon={faCamera} className="text-2xl mt-2" />
          </div>
        </label>
        {error.image && (
          <p className="text-red-500 text-sm mt-2">{error.image}</p>
        )}
      </div>

      <span className="text-blue-500 hover:underline text-center block cursor-pointer">
        Upload Image
      </span>

      {/* Form Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange(setTitle)}
          placeholder="Enter blog title"
          required
          className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
            error.title ? "border-red-500" : ""
          }`}
        />
        {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={handleInputChange(setDuration)}
            placeholder="e.g., 10 min read"
            required
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.duration ? "border-red-500" : ""
            }`}
          />
          {error.duration && (
            <p className="text-red-500 text-sm">{error.duration}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleInputChange(setCategory)}
            placeholder="Enter category"
            required
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.category ? "border-red-500" : ""
            }`}
          />
          {error.category && (
            <p className="text-red-500 text-sm">{error.category}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={handleInputChange(setDescription)}
          placeholder="Enter blog description"
          rows="5"
          required
          className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
            error.description ? "border-red-500" : ""
          }`}
        />
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-[#103153] px-5 text-white py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {blog ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
