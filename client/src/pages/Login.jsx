import { useState } from "react";
import loginImage from "../assets/login-img.png";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfbfc] flex items-center justify-center p-8">
      <div className="w-[1400px] h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

        {/* Left Section */}
        <div className="w-1/2 relative bg-[#38204F]">
          <img
            src={loginImage}
            alt="Wallet"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-[#fff1fb] flex items-center justify-center">

          <div className="w-[66%] max-w-[420px]">

            <h1 className="text-[22px] font-bold text-[#412458] leading-tight mt-4">
              Welcome Back
            </h1>

            <p className="mt-0 text-[14px] text-[#704388]">
              Login to your account
            </p>

            {/* Email */}
            <div className="mt-4">

              <label className="block text-[14px] font-semibold text-[#704388] mb-2">
                Email
              </label>

              <div className="relative">

                <MdOutlineEmail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[16px] text-[#804E90]"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[35px]
                  rounded-2xl
                  bg-[#ffeef7]
                  border border-[#feb4d9]
                  pl-14 pr-5
                  outline-none
                  transition
                  focus:ring-4
                  focus:ring-[#E9D5FF]
                  focus:border-[#ed3aa5]"
                />

              </div>

            </div>

            {/* Password */}
            <div className="mt-2">

              <label className="block text-[14px] font-semibold text-[#704388] mb-2">
                Password
              </label>

              <div className="relative">

                <RiLockPasswordLine
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[14px] text-[#804E90]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-[35px]
                  rounded-2xl
                  bg-[#EEF3FF]
                  border border-[#feb4d7]
                  pl-14 pr-14
                  outline-none
                  transition
                  focus:ring-4
                  focus:ring-[#E9D5FF]
                  focus:border-[#ed3a90]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#804E90]"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>

              </div>

            </div>
                        {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-2">

  <button
  type="button"
  className="block ml-auto mt-1 text-[12px] font-medium text-[#804E90] hover:underline"
>
  Forgot Password?
</button>

</div>

            {/* Login Button */}
            <button
              className="w-[100px] h-[35px] mt-1 rounded-2xl
              bg-[#804E90]
              text-white
              text-[15px]
              font-semibold
              transition-all duration-300
              hover:bg-[#412458]
              hover:scale-[1.01]
              active:scale-[0.99]"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-[1px] bg-[#D8B4FE]"></div>

              <span className="text-[#804E90] text-[11px]">
                OR
              </span>

              <div className="flex-1 h-[1px] bg-[#D8B4FE]"></div>
            </div>

            {/* Register */}
            <p className="text-center text-[12px] text-[#412458]">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-[#412458] font-semibold hover:underline"
              >
                Register
              </button>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;