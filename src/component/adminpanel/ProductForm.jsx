import { faCamera, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ product }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState({});

  // Populate form fields if editing a product
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setLink(product.link || "");
      setImage(product.image || null);
    }
  }, [product]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (!name) newError.name = "Name is required";
    if (!description) newError.description = "Description is required";
    if (!image && !product) newError.image = "Image upload is required";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("link", link);
      if (image instanceof File) {
        formData.append("image", image);
      }

      try {
        const url = product
          ? `https://apis.innobrains.pk/api/product/${product._id}`
          : "https://apis.innobrains.pk/api/product";
        const method = product ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          body: formData,
        });

        if (response.ok) {
          navigate("/products");
        } else {
          alert("Failed to save product");
        }
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    }
  };

  // Define onClose function to navigate back
  const onClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div
        className="bg-white p-8 rounded-lg shadow-md"
        style={{ width: "100%" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-blue-500 transition duration-200 rounded-lg mb-4"
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <div className="flex flex-col items-center mb-6">
          {/* Image Upload Section */}
          <div className="w-24 p-7 rounded-full bg-[#ECECEE] text-center mb-4">
            <label className="block relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              <div className="border bg-[#ECECEE] rounded-full flex justify-center items-center h-full w-full">
                <FontAwesomeIcon icon={faCamera} className="text-3xl" />
              </div>
            </label>
            {error.image && (
              <p className="text-red-500 text-sm mt-2">{error.image}</p>
            )}
          </div>

          <span className="text-blue-500 hover:underline cursor-pointer">
            Upload Image
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="How To Start Building Mobile App Architecture"
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-2">{error.name}</p>
            )}
          </div>

          {/* Link */}
          <div className="mb-4">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="http://educationbrains.com"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
              rows="5"
            />
            {error.description && (
              <p className="text-red-500 text-sm mt-2">{error.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#103153] text-white px-6 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              {product ? "Update" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
