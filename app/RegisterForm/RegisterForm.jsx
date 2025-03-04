"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faCalendar, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", dob: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  
    const data = await res.json();
    if (res.ok) {
      toast.success("Registration successful! Please log in.");
      localStorage.setItem("user", JSON.stringify(data.user));
      setTimeout(() => (window.location.href = "/"), 1000);
    } else {
      alert(data.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 to-blue-900">
    <div className="bg-[#1C2331] p-8 rounded-lg shadow-lg w-115">
      <div className="flex flex-col items-center">
        <div className="bg-cyan-400 w-full text-center py-3 rounded-t-lg text-white font-bold text-xl">
          SIGN UP
        </div>
        <div className="bg-gray-700 rounded-full p-3 mt-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user"
            className="w-16 h-16"
          />
        </div>
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute h-4 w-4 left-3 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 p-3 bg-gray-800 text-white rounded-lg focus:outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute  h-4 w-4 left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 bg-gray-800 text-white rounded-lg focus:outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <div className="relative">
            <FontAwesomeIcon icon={faCalendar} className="absolute  h-4 w-4 left-3 top-4 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 p-3 bg-gray-800 text-white rounded-lg focus:outline-none"
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 h-4 w-4 top-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 p-3 bg-gray-800 text-white rounded-lg focus:outline-none"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-4 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer mt-6 bg-cyan-400 text-white py-3 rounded-lg hover:bg-cyan-500"
        >
          SIGN UP
        </button>
      </form>

      {/* Already have an account? */}
      <div className="text-center mt-4">
        <p className="text-gray-400">
          Already have an account?{" "}
          <a href="/" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
  </div>
  );
}
