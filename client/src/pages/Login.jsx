import { useState } from "react";
import loginImage from "../assets/login-img.png";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { PiWalletFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    // Save token
    localStorage.setItem("token", response.data.token);

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex">

      {/* Left Section */}
      <div className="w-1/2 relative bg-[#38204F]">
        <img
          src={loginImage}
          alt="Wallet"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#F3F1F9] flex items-center justify-center">
        <div className="w-full max-w-sm p-6">

          {/* Logo + brand */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shrink-0">
              <PiWalletFill className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-[#490f61de]">
              MemoryVault
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-[#711e92de] mb-1.5">
            Welcome back
          </h1>
          <p className="text-[14px] font-medium text-[#3e0355de] mb-5">
            Sign in to access your digital wallet.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <div>
              <label className="block text-[12px] font-semibold text-[#611381de] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <MdOutlineEmail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-[#EAE7F5] border border-transparent rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12px] font-semibold text-[#611381de]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-violet-600 hover:text-violet-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <RiLockPasswordLine className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                   name="password"
                    value={formData.password}
                    onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-[#EAE7F5] border border-transparent rounded-lg pl-9 pr-9 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                   disabled={loading}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={16} />
                  ) : (
                    <IoEyeOutline size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-white font-semibold text-xs bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 hover:brightness-105 active:brightness-95 transition shadow-sm"
            >
               {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-xs text-slate-500 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Create one
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;