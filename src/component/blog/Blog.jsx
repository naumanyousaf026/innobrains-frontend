import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import BlogSection from "../BlogSection";
import BlogIntroSection from "./BlogIntroSection";

function Blog() {
  return (
    <div>
      <Header />
      <BlogIntroSection />
      <BlogSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Blog;
