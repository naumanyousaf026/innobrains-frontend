import React, { useState, useEffect } from "react";
import axios from "axios";
import { faCamera, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemberForm = ({ onAddMember, onUpdateMember, member, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    role: "",
    description: "",
    email: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fill form with member data when editing
  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.firstName || "",
        lastName: member.lastName || "",
        gender: member.gender || "Male",
        role: member.role || "",
        description: member.description || "",
        email: member.email || "",
        image: null // We don't set the image file here as it's not available as File object
      });
      
      // Set image preview if available
      if (member.image) {
        setImagePreview(`https://apis.innobrains.pk/TeamImages/${member.image}`);
      }
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First name is required.";
    if (!formData.lastName) formErrors.lastName = "Last name is required.";
    if (!formData.role) formErrors.role = "Role is required.";
    if (!formData.description)
      formErrors.description = "Description is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.image && !member) formErrors.image = "Please upload an image.";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("email", formData.email);
      
      // Only append image if a new one is selected
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      try {
        if (member) {
          // Configure axios with longer timeout and proper headers for update
          const apiUrl = `https://apis.innobrains.pk/api/team/${member._id}`;
          console.log("Updating member at URL:", apiUrl);
          
          const response = await axios({
            method: 'put',
            url: apiUrl,
            data: formDataToSend,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 30000 // Increase timeout to 30 seconds
          });
          
          console.log("Update response:", response.data);
          onUpdateMember(response.data);
          alert("Team member updated successfully");
        } else {
          // Add new member
          const response = await axios.post(
            "https://apis.innobrains.pk/api/team",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              timeout: 30000 // Increase timeout to 30 seconds
            }
          );
          onAddMember(response.data);
          alert("Team member added successfully");
        }
        
        // Reset form data
        setFormData({
          firstName: "",
          lastName: "",
          gender: "Male",
          role: "",
          description: "",
          email: "",
          image: null,
        });
        setImagePreview(null);
      } catch (error) {
        console.error("Error submitting the form", error);
        if (error.code === 'ERR_NETWORK') {
          alert("Network error. Please check your connection and try again.");
        } else if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(`Error: ${error.response.data.error || 'Server error'}`);
        } else {
          alert(member ? "Failed to update team member" : "Failed to add team member");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      {/* Back Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
        className="flex items-center mb-4 text-[#103153] hover:text-blue-600"
      >
        <FontAwesomeIcon icon={faLeftLong} className="mr-2" />
        Back
      </button>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center mb-4">
        <label className="relative w-24 h-24 rounded-full bg-[#ECECEE] flex justify-center items-center cursor-pointer">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faCamera} className="text-3xl" />
          )}
        </label>
        {error.image && (
          <p className="text-red-500 text-sm mt-2">{error.image}</p>
        )}
      </div>
      <span className="text-blue-500 mb-2 hover:underline text-center block cursor-pointer">
        Upload Image
      </span>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
          {error.firstName && (
            <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
          {error.lastName && (
            <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
          {error.role && (
            <p className="text-red-500 text-sm mt-1">{error.role}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg h-32 resize-none"
          />
          {error.description && (
            <p className="text-red-500 text-sm mt-1">{error.description}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#103153] text-white px-6 py-3 rounded-lg hover:bg-blue-600 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Processing..." : member ? "Update Team Member" : "Add Team Member"}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;