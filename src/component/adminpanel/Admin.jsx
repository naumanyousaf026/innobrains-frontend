import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductSection from "./ProductSection";
import Dashboard from "./Dashboard";
import Blog from "./Blog";
import Team from "./Team";
import Service from "./Service";
import Visitor from "./Visitor";
import AchievementForm from "./AchievementForm";
import ContactInfoForm from "./ContactInfoForm";
import StepForm from "./StepForm";
import UserSubmissions from "./UserSubmissions";
import StateForm from "./StateForm";
import State from "./State";
import AboutForm from "./AboutForm";
import About from "./AboutPreview";
import Achievement from "./Achievement";
import ContactInfo from "../contact/ContactInfo";

const Admin = () => {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false); // <-- Add toggle state

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex relative">
      <Sidebar
        setSection={setSection}
        handleLogout={handleLogout}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex-1">
        <Header setSidebarOpen={toggleSidebar} />
        <div className="p-5 shadow-md flex flex-col gap-5">
          {section === "dashboard" && <Dashboard />}
          {section === "products" && <ProductSection />}
          {section === "services" && <Service />}
          {section === "blogs" && <Blog />}
          {section === "team" && <Team />}
          {section === "userSubmissions" && <UserSubmissions />}
          {section === "AchievementForm" && <Achievement />}
          {section === "ContactInfoForm" && (
            <div className="w-full">
              {/* Toggle Button */}
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-fit mb-4"
              >
                {showForm ? "Show Contact Info" : "Edit Contact Info"}
              </button>

              {/* Conditional Rendering */}
              {showForm ? (
                <ContactInfoForm /> // Replace with your actual form
              ) : (
                <ContactInfo widthClass="w-[80%] ml-auto" />
              )}
            </div>
          )}
          {section === "StepForm" && <StepForm />}
          {section === "stateForm" && <StateForm />}
          {section === "state" && <State />}
          {section === "AboutForm" && <AboutForm />}
          {section === "About" && <About />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
