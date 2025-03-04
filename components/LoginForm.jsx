"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock , faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  
export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: "login" }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Login successful!", { autoClose: 2000 });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setTimeout(() => router.push("/dashboard"), 1000);  
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 to-blue-900">
      <div className="bg-[#1C2331] p-8 rounded-lg shadow-lg w-110">
        <div className="flex flex-col items-center">
          <div className="bg-cyan-400 w-full text-center py-3 rounded-t-lg text-white font-bold text-xl">
            SIGN IN
          </div>
          <div className="bg-gray-700 rounded-full p-3 mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              className="w-16 h-16"
            />
          </div>
        </div>

        <form className="mt-6" onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute h-4 w-4 left-3 top-4 text-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 p-3 bg-gray-800 text-white rounded-lg focus:outline-none"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 h-4 w-4 top-4 top-3 text-gray-400"
              />
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
            LOGIN
          </button>
        </form>

        {/* Don't have an account? */}
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a href="/RegisterForm" className="text-cyan-400 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
