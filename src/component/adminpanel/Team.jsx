import React, { useState, useEffect } from "react";
import axios from "axios";

const Team = ({ onAddMember, onUpdateMember, member, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    image: null, // For file upload
    imagePreview: null // For image preview
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // If member is provided (editing mode), set form data accordingly
  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        image: null, // Don't set the file itself
        imagePreview: member.image ? `https://apis.innobrains.pk/TeamImages/${member.image}` : null
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("role", formData.role);
      form.append("email", formData.email);
      
      // Only append image if there's a new one selected
      if (formData.image) {
        form.append("image", formData.image);
      }

      if (member) {
        // Update existing member
        const response = await axios.put(
          `https://apis.innobrains.pk/api/team/${member._id}`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          }
        );
        onUpdateMember(response.data);
      } else {
        // Add new member
        const response = await axios.post(
          "https://apis.innobrains.pk/api/team",
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          }
        );
        onAddMember(response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Profile Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formData.imagePreview && (
            <div className="mt-3">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isUploading}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition duration-200 hover:bg-blue-700 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {member ? "Update Member" : "Add Member"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isUploading}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition duration-200 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Team;