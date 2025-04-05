import React, { useState, useEffect } from "react";
import axios from "axios";

const MemberForm = ({ onAddMember, onUpdateMember, member, onCancel }) => {
  // Initialize form state - if member prop exists, use its values for editing
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Important: Load member data into form when component mounts or member changes
  useEffect(() => {
    if (member) {
      // We're in edit mode, initialize form with member data
      setFormData({
        name: member.name || "",
        role: member.role || "",
        email: member.email || "",
        // Don't set image here as it's a file input
        // We'll handle it separately
      });
      
      // Set image preview if available
      if (member.image) {
        setImagePreview(`https://apis.innobrains.pk/TeamImages/${member.image}`);
      }
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("email", formData.email);
      
      // Only append image if a new one is selected
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      if (member) {
        // We're updating an existing member
        // Pass the member ID and other data that might be needed for the update
        formDataToSend.append("_id", member._id);
        
        const response = await axios.put(
          `https://apis.innobrains.pk/api/team/${member._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        // Create updated member object with all necessary fields
        const updatedMember = {
          ...member,
          name: formData.name,
          role: formData.role,
          email: formData.email,
          // If the API returns the updated image name, use it, else keep the original
          image: response.data.image || member.image,
        };
        
        onUpdateMember(updatedMember);
      } else {
        // We're adding a new member
        const response = await axios.post(
          "https://apis.innobrains.pk/api/team",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        onAddMember(response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting
              ? "Submitting..."
              : member
              ? "Update Member"
              : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;