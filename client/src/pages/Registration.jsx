import { useState } from "react";

import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { PiWalletFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { IoShieldCheckmarkOutline, IoNotificationsOutline, IoCloudUploadOutline } from "react-icons/io5";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F3F1F9] flex gap-0">

      {/* Left Section - gradient block */}
      
      <div className="w-1/2 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center p-8 my-4 ml-5">
        <div className="max-w-md text-white">

          <h2 className="text-2xl font-bold leading-tight mb-1 mt-1">
            Your documents,<br />always in reach.
          </h2>
          <p className="text-xs font-medium text-violet-50 mb-5 leading-relaxed">
            MemoryVault keeps every card, ID, and important reminder in one
            secure digital wallet, so you're never searching for a document
            when you need it most.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold">Bank-level security</p>
                <p className="text-[11px] text-violet-50">
                  Your data stays encrypted, always.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <IoNotificationsOutline className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold">Smart reminders</p>
                <p className="text-[11px] text-violet-50">
                  Never miss a renewal or due date again.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <IoCloudUploadOutline className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold">Access anywhere</p>
                <p className="text-[11px] text-violet-50">
                  Sync across all your devices instantly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#F3F1F9] flex items-center justify-start ml-8">
        <div className="w-full max-w-xs p-5 ml-2">

          {/* Logo + brand */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shrink-0">
              <PiWalletFill className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">
              MemoryVault
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[19px] font-bold text-[#390a56de] mb-0">
            Create your account
          </h1>
          <p className="text-[12px] font-medium text-[#3f0a60de] mb-3.5">
            Sign up to start saving your digital wallet.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">

            {/* Name */}
            <div>
              <label className="block text-[11px] font-semibold text-[#2d0745de] mb-1">
                Full name
              </label>
              <div className="relative">
                <FiUser className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-[24px] bg-[#EAE7F5] border border-transparent rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold text-[#2d0745de] mb-1">
                Email address
              </label>
              <div className="relative">
                <MdOutlineEmail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-[24px] bg-[#EAE7F5] border border-transparent rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] font-semibold text-[#2d0745de] mb-1">
                Phone number
              </label>
              <div className="relative">
                <MdOutlinePhone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full h-[24px] bg-[#EAE7F5] border border-transparent rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold text-[#2d0745de] mb-1">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-[24px] bg-[#EAE7F5] border border-transparent rounded-lg pl-8 pr-8 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={14} />
                  ) : (
                    <IoEyeOutline size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg py-2 text-white font-semibold text-[11px] bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 hover:brightness-105 active:brightness-95 transition shadow-sm"
            >
              Create account
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-[11px] text-slate-500 mt-3">
            Already have an account?{" "}
            <button
              type="button"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Sign in
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;