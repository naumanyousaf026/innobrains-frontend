import { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HeroSection from "./component/HeroSection";
import ContactForm from "./component/ContactForm";
import ClientCarousel from "./component/ClientCarousel";
import ServicesSection from "./component/Servicescopmonent";
import RecentWork from "./component/RecentWork";
import BlogSection from "./component/BlogSection";
import WideRange from "./component/WideRange";
import BlogInfoSection from "./component/BlogInfoSection";
import Wave from "./component/TopWave";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <ClientCarousel />
      <WideRange />
      <ServicesSection limit={3} /> {/* Show 3 services */}
      <Wave />
      <RecentWork limit={3} /> {/* Show 3 products */}
      <BlogInfoSection />
      <BlogSection limit={3} /> {/* Show 3 blogs */}
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;
