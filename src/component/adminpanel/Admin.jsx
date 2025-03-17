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

const Admin = () => {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex-1">
        <Header setSidebarOpen={toggleSidebar} />
        <div className="p-0o lg:p-0">
          {section === "dashboard" && <Dashboard />}
          {section === "products" && <ProductSection />}
          {section === "services" && <Service />}
          {section === "blogs" && <Blog />}
          {section === "team" && <Team />}
          {section === "visitor" && <Visitor />}
          {section === "AchievementForm" && <AchievementForm />}
          {section === "ContactInfoForm" && <ContactInfoForm />}
          {section == "StepForm" && <StepForm />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
