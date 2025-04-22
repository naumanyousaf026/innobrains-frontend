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
  const [isLoading, setIsLoading] = useState(false);

  // Load step data if editing an existing step
  useEffect(() => {
    if (step) {
      // Populate form with existing step data
      setFormData({
        number: step.number || "",
        title: step.title || "",
        description: step.description || "",
        image: null, // Initial image is null, only set if user uploads new image
      });
      
      // Set image preview for existing image
      if (step.image) {
        setImagePreview(`https://apis.innobrains.pk/GrowthStepImage/${step.image}`);
      }
    } else {
      // Reset form for new step
      setFormData({
        number: "",
        title: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
    }
  }, [step]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "image") {
      handleImageUpload(e);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError((prev) => ({ ...prev, [name]: "" }));
    }
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

  // Form validation
  const validateForm = () => {
    const newError = {};
    if (!formData.number) newError.number = "Step number is required.";
    if (!formData.title) newError.title = "Title is required.";
    if (!formData.description) newError.description = "Description is required.";
    
    // Only require image for new steps
    if (!step && !formData.image) {
      newError.image = "Image is required for new steps.";
    }
    
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("number", formData.number);
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    
    // Only append image if a new one is selected
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      let url = "https://apis.innobrains.pk/api/growthsteps";
      let method = "POST";
      
      // If editing, use PUT method and include ID in URL
      if (step && step._id) {
        url = `https://apis.innobrains.pk/api/growthsteps/${step._id}`;
        method = "PUT";
      }
      
      const response = await fetch(url, {
        method,
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(step ? "Step updated successfully!" : "Step created successfully!");
        
        // Close form after short delay to show success message
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const errorData = await response.json();
        setError({ general: errorData.message || `Error ${step ? "updating" : "creating"} step` });
      }
    } catch (error) {
      console.error("API error:", error);
      setError({ general: "Error connecting to the server" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full ml-auto bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full"
      >
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        {error.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.general}
          </div>
        )}

        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-blue-500 transition duration-200 rounded-lg"
          >
            <FontAwesomeIcon icon={faLeftLong} /> Back
          </button>
          
          <h2 className="text-xl font-semibold">
            {step ? "Edit Growth Step" : "Add New Growth Step"}
          </h2>
        </div>

        {/* Image Upload Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto p-3 rounded-full bg-[#ECECEE] text-center mb-4 relative">
            <label className="block cursor-pointer">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="border bg-[#ECECEE] rounded-full flex justify-center items-center h-full w-full">
                  <FontAwesomeIcon icon={faCamera} className="text-2xl" />
                </div>
              )}
            </label>
          </div>
          
          <span className="text-[#103153] text-center block cursor-pointer">
            {step ? "Change Image" : "Upload Image"}
          </span>
          
          {error.image && (
            <p className="text-red-500 text-sm mt-2">{error.image}</p>
          )}
        </div>

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
          <label className="block text-[#103153] font-semibold mb-2">
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
            disabled={isLoading}
            className={`bg-[#103153] px-5 text-white py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              step ? "Update Step" : "Add Step"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrowthStepForm;