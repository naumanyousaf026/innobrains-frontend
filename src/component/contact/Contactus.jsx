import React from "react";
import { Form } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ContactInfo from "./ContactInfo";

function Contactus() {
  return (
    <div>
      <Header />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default Contactus;
