import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "../ui/Spinner";
import axios from "axios";

export const ContactCompo = () => {
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log("Form data to be submitted:", formData); // Log form data

    try {
      const response = await axios.post("https://apis.innobrains.pk/api/contact", {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        email: formData.email,
        number: formData.phone, // Make sure this matches the schema
        message: formData.message,
      });

      if (response.status === 201) {
        setLoader(false);
        toast({
          description: "Your message has been sent.",
        });
        setFormData({
          FirstName: "",
          LastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      setLoader(false);
      console.error("Error sending message:", error);
      toast({
        description: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(2, 60, 75, 0.10)" }}
      className="flex flex-col items-center gap-[48px] relative pt-24 pb-32"
    >
      <div className="flex justify-between items-center gap-[24px] relative container">
        <div className="flex flex-col w-full items-start justify-center gap-[24px] pl-0 md:pr-[32px] py-0 relative rounded-[8px]">
          <div className="flex flex-col items-start gap-[8px] relative self-stretch w-full flex-[0_0_auto]">
            <div
              style={{ fontSize: "2rem" }}
              className="relative self-stretch mt-[-1.00px] font-bold"
            >
              Contact Us
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-[318px] items-start gap-[16px] relative self-stretch w-full"
          >
            <div className="flex flex-col items-start gap-[16px] relative flex-1 self-stretch w-full grow">
              <div
                style={{ border: "1px solid #4E5A5E" }}
                className="flex items-center gap-[10px] p-[16px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px] overflow-hidden"
              >
                <input
                  name="FirstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                  className="bg-transparent w-full h-full outline-none placeholder:text-[#4E5A5E]"
                />
              </div>

              <div
                style={{ border: "1px solid #4E5A5E" }}
                className="flex items-center gap-[10px] p-[16px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px] overflow-hidden"
              >
                <input
                  name="LastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.LastName}
                  onChange={handleInputChange}
                  className="bg-transparent w-full h-full outline-none placeholder:text-[#4E5A5E]"
                />
              </div>

              <div
                style={{ border: "1px solid #4E5A5E" }}
                className="flex items-center gap-[10px] p-[16px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px] overflow-hidden"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-transparent w-full h-full outline-none placeholder:text-[#4E5A5E]"
                />
              </div>

              <div
                style={{ border: "1px solid #4E5A5E" }}
                className="flex items-center gap-[10px] p-[16px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px] overflow-hidden"
              >
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-transparent w-full h-full outline-none placeholder:text-[#4E5A5E]"
                />
              </div>

              <div
                style={{ border: "1px solid #4E5A5E" }}
                className="flex items-center gap-[10px] pt-[16px] px-[16px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px] overflow-hidden"
              >
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-transparent w-full h-[140px] resize-none outline-none placeholder:text-[#4E5A5E]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#023C4B] w-full py-3 rounded-lg text-white font-bold text-lg"
            >
              {loader ? <Spinner /> : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
