import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signupform() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Changed from username to name
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        "https://apis.innobrains.pk/api/admin/register",
        {
          email,
          name, // Changed from username to name
          password,
        }
      );

      if (response.status === 201) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f2a46] nunito-sans">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 nunito-sans">
        <h2 className="text-2xl font-bold text-center mb-4 nunito-sans">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center mb-6 nunito-sans">
          Create an account to continue
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 nunito-sans">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mb-4 nunito-sans">
            {success}
          </p>
        )}

        <form onSubmit={handleSignup}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 nunito-sans">
              Email address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="esteban_schiller@gmail.com nunito-sans"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 nunito-sans text-gray-700 focus:outline-none"
              required
            />
          </div>

          {/* Name Input (formerly Username) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 nunito-sans">
              Name
            </label>
            <input
              type="text"
              value={name} // Changed from username to name
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 nunito-sans focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 nunito-sans">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 nunito-sans focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-6 nunito-sans">
            <input
              type="checkbox"
              className="mr-2"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="text-sm text-gray-700 nunito-sans">
              I accept terms and conditions
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#1d3557] text-white font-bold py-2 px-4 rounded-lg nunito-sans hover:bg-[#16334a] transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4 nunito-sans">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-bold nunito-sans">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signupform;
