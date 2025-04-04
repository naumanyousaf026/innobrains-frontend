import React from "react";
import { Form } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ContactInfo from "./ContactInfo";
import ContactUs from "./Form";
impo
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
