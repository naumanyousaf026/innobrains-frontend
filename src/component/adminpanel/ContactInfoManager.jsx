import React, { useState } from "react";
import ContactInfoForm from "./ContactInfoForm";
import ContactInfo from "../contact/ContactInfo";

const ContactInfoManager = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm((prev) => !prev);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 lg:w-[80%] ml-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {showForm ? "Edit Contact Info" : "Contact Info"}
        </h1>
        <button
          onClick={handleToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Show Contact Info" : "Edit Contact Info"}
        </button>
      </div>

      {showForm ? (
        <ContactInfoForm onClose={handleFormClose} />
      ) : (
        <ContactInfo widthClass="w-[80%] ml-auto" />
      )}
    </div>
  );
};

export default ContactInfoManager;
