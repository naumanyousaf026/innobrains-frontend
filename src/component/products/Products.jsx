import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import RecentWork from "../RecentWork";
import InnovationSection from "./InnovationSection";

function Products() {
  return (
    <div>
      <Header />
      <InnovationSection />
      <RecentWork />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Products;
