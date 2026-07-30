import { useState } from "react";

import {

  MdOutlineNotifications,
  MdOutlineSearch,
  MdOutlineKeyboardArrowDown,

} from "react-icons/md";

import Sidebar from "../components/Sidebar";

function WalletIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full">
      <defs>
        <linearGradient id="pouch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="30" r="10" fill="#FBCFE8" opacity="0.7" />
      <circle cx="280" cy="50" r="7" fill="#FDE68A" opacity="0.8" />
      <circle cx="20" cy="150" r="6" fill="#FBCFE8" opacity="0.6" />
      <ellipse cx="45" cy="90" rx="16" ry="12" fill="#E9D5FF" opacity="0.7" />

      {/* shield */}
      <g transform="translate(120 55) rotate(-8)">
        <path d="M0 0 L26 8 V30 Q26 46 0 54 Q-26 46 -26 30 V8 Z" fill="#F472B6" />
        <path d="M-9 26 L-2 33 L11 15" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* aadhaar card */}
      <g transform="translate(150 60) rotate(-6)">
        <rect x="-24" y="-30" width="60" height="76" rx="6" fill="#FBCFE8" />
        <circle cx="-8" cy="-10" r="7" fill="#F472B6" opacity="0.8" />
        <rect x="-14" y="4" width="36" height="4" rx="2" fill="#F472B6" opacity="0.6" />
        <rect x="-14" y="12" width="26" height="3" rx="1.5" fill="#F472B6" opacity="0.5" />
      </g>

      {/* passport */}
      <g transform="translate(210 45) rotate(6)">
        <rect x="-26" y="-36" width="64" height="86" rx="6" fill="#7C3AED" />
        <circle cx="6" cy="-6" r="14" fill="none" stroke="#FDE68A" strokeWidth="2.5" />
        <line x1="-8" y1="-6" x2="20" y2="-6" stroke="#FDE68A" strokeWidth="2" />
        <rect x="-10" y="20" width="32" height="3" rx="1.5" fill="#FDE68A" opacity="0.7" />
      </g>

      {/* PAN card */}
      <g transform="translate(120 100) rotate(-4)">
        <rect x="-26" y="-18" width="58" height="42" rx="6" fill="#60A5FA" />
        <circle cx="-10" cy="0" r="6" fill="#EFF6FF" opacity="0.9" />
        <rect x="0" y="-4" width="22" height="3" rx="1.5" fill="#EFF6FF" opacity="0.7" />
        <rect x="0" y="3" width="16" height="3" rx="1.5" fill="#EFF6FF" opacity="0.6" />
      </g>

      {/* driving license */}
      <g transform="translate(178 108) rotate(4)">
        <rect x="-28" y="-16" width="60" height="40" rx="6" fill="#FDE68A" />
        <circle cx="18" cy="-2" r="6" fill="#F59E0B" opacity="0.8" />
        <rect x="-16" y="-2" width="24" height="3" rx="1.5" fill="#B45309" opacity="0.6" />
        <rect x="-16" y="5" width="18" height="3" rx="1.5" fill="#B45309" opacity="0.5" />
      </g>

      {/* insurance */}
      <g transform="translate(228 100) rotate(2)">
        <rect x="-22" y="-18" width="48" height="46" rx="6" fill="#C4B5FD" />
        <path d="M0 -6 L10 -1 V8 Q10 15 0 19 Q-10 15 -10 8 V-1 Z" fill="#FFFFFF" opacity="0.85" />
      </g>

      {/* wallet pouch */}
      <path
        d="M40 140
           Q40 128 52 128
           H260
           Q272 128 272 140
           V200
           Q272 212 260 212
           H52
           Q40 212 40 200
           Z"
        fill="url(#pouch)"
      />
      <rect x="40" y="150" width="232" height="10" fill="#7C3AED" opacity="0.35" />
      <circle cx="156" cy="170" r="12" fill="#FDE68A" />
      <circle cx="156" cy="170" r="12" fill="none" stroke="#F59E0B" strokeWidth="3" />

      <g transform="translate(20 175)">
        <circle cx="0" cy="0" r="16" fill="#FCD34D" />
        <text x="0" y="5" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#B45309">$</text>
      </g>
      <g transform="translate(290 180)">
        <circle cx="0" cy="0" r="11" fill="#FCD34D" />
      </g>
    </svg>
  );
}

export default function DashboardHome() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="min-h-screen w-full flex bg-[#F3F1F9]">

      {/*Side bar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-[#F7F4FF]">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="relative w-96">
            <MdOutlineSearch className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full bg-white border border-[#ECE8F7] rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-slate-500 hover:text-slate-700">
              <MdOutlineNotifications className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            <button className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <span className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </span>
              <MdOutlineKeyboardArrowDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
        {/* Hero banner */}
        <div className="rounded-2xl bg-purple-200 p-8 flex items-center justify-between overflow-hidden">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Hello, {user?.name || "User"}! <span>👋</span>
            </h1>
          <p className="text-sm text-slate-500 mt-0">
            Welcome to your Digital Memory Assistant
          </p>
            <h2 className="text-[16px] font-bold text-slate-900 leading-snug mb-3">
              Keep your important documents{" "}
              <span className="text-violet-600">safe &amp; organized</span>
            </h2>
            <p className="text-sm text-slate-600">
              Upload, manage and never miss a renewal again.
            </p>
          </div>
          <div className="w-64 h-30 shrink-0">
            <WalletIllustration />
          </div>
        </div>

      </main>
    </div>
  );
}