import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ServicesSection from "../Servicescopmonent";
import GrowthSteps from "./GrowthSteps";
import VisionComponent from "./VisionComponent";

function services() {
  return (
    <div>
      <Header />
      <VisionComponent />
      <ServicesSection />
      <GrowthSteps />
      <Footer />
    </div>
  );
}
export default services;
