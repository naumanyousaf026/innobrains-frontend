import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://apis.innobrains.pk/api/admin/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);

      // Save token in localStorage and redirect to admin page
      localStorage.setItem("authToken", response.data.token);
      navigate("/admin"); // Redirect to admin page
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f2a46]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4 font-nunito">
          Login to Account
        </h2>
        <p className="text-gray-500 text-center mb-6 font-nunito">
          Please enter your email and password to continue
        </p>

        {/* Display Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-nunito">
              Email address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="esteban_schiller@gmail.com"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none font-nunito"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-nunito">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none font-nunito"
                required
              />
            </div>
          </div>

          {/* Remember Password and Forget Password Link */}
          <div className="flex items-center mb-6 font-nunito">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm text-gray-700">Remember Password</label>
            <Link
              to="/emailrequest"
              className="ml-auto text-sm text-gray-500 font-nunito"
            >
              Forget Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-[#1d3557] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#16334a] transition duration-300 font-nunito">
            Sign In
          </button>
        </form>

        {/* Create Account Link */}
        {/* <p className="text-center text-sm text-gray-500 mt-4 font-nunito">
          Don’t have an account?{" "}
          <Link
            to="/Signupform"
            className="text-blue-600 font-bold font-nunito"
          >
            Create Account
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
