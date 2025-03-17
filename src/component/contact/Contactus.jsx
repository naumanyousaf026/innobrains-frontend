import React from "react";
import { Form } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ContactUs from "./form";
import ContactInfo from "./ContactInfo";

function Contactus() {
  return (
    <div>
      <Header />
      <ContactUs />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default Contactus;
