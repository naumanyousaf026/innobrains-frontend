import React, { useState, useEffect } from "react";
import { faCamera, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        image: null,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? e.target.files[0] : value,
    }));

    setError((prev) => ({ ...prev, [name]: "" }));
    if (name === "image") handleImageUpload(e);
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
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!formData.name) newError.name = "Service name is required.";
    if (!formData.description)
      newError.description = "Description is required.";
    if (!formData.image) newError.image = "Image is required.";
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const method = service ? "PUT" : "POST";
    const url = service
      ? `https://apis.innobrains.pk/api/service/${service._id}`
      : "https://apis.innobrains.pk/api/service";
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    if (formData.image) form.append("image", formData.image);

    try {
      const response = await fetch(url, {
        method,
        body: form,
      });
      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to save service");
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg mx-auto"
    >
      <button
        type="button"
        onClick={onClose}
        className="text-gray-600 hover:text-blue-500 transition duration-200 rounded-lg mb-4"
      >
        <FontAwesomeIcon icon={faLeftLong} />
      </button>

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

      <span className="text-blue-500 hover:underline text-center block cursor-pointer">
        Upload Image
      </span>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Service Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter service name"
          required
          className={`border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
            error.name ? "border-red-500" : ""
          }`}
        />
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter service description"
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

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-[#103153] px-5 text-white py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {service ? "Update Service" : "Add Service"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
