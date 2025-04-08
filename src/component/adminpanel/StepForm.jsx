import React, { useState, useEffect } from "react";
import { faCamera, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GrowthStepForm = ({ step, onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    number: "",
    title: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Load step data if editing an existing step
  useEffect(() => {
    if (step) {
      setFormData({
        number: step.number,
        title: step.title,
        description: step.description,
        image: null,
      });
    }
  }, [step]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? e.target.files[0] : value,
    }));
    setError((prev) => ({ ...prev, [name]: "" }));

    if (name === "image") handleImageUpload(e);
  };

  // Image preview handler
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
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError((prev) => ({ ...prev, image: "" }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!formData.number) newError.number = "Step number is required.";
    if (!formData.title) newError.title = "Title is required.";
    if (!formData.description)
      newError.description = "Description is required.";
    if (!formData.image) newError.image = "Image is required.";
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("number", formData.number);
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", formData.image);

    try {
      const response = await fetch("https://apis.innobrains.pk/api/growthsteps", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Step created successfully!");
        setFormData({
          number: "",
          title: "",
          description: "",
          image: null,
        });
        setImagePreview(null);
        onClose(); // Close form on success
      } else {
        const errorData = await response.json();
        setError({ general: errorData.message || "Error creating step" });
      }
    } catch (error) {
      setError({ general: "Error connecting to the server" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:w-[80%] ml-auto bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full"
      >
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {error.general && <p className="text-red-500 mb-4">{error.general}</p>}

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
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <div className="border bg-[#ECECEE] rounded-full flex justify-center items-center h-full w-full">
              <FontAwesomeIcon icon={faCamera} className="text-2xl mt-2" />
            </div>
          </label>
          {error.image && (
            <p className="text-red-500 text-sm mt-2">{error.image}</p>
          )}
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mx-auto w-24 h-24 object-cover rounded-full mb-4"
          />
        )}

        <span className="text-[#103153]  text-center block cursor-pointer">
          Upload Image
        </span>

        {/* Step Number Input */}
        <div className="mb-4">
          <label className="block text-[#103153] font-semibold mb-2">
            Step Number
          </label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter step number"
            required
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.number ? "border-red-500" : ""
            }`}
          />
          {error.number && (
            <p className="text-red-500 text-sm">{error.number}</p>
          )}
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-[#103153] font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
            className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              error.title ? "border-red-500" : ""
            }`}
          />
          {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-[#103153]  font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
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
            {step ? "Update Step" : "Add Step"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrowthStepForm;
