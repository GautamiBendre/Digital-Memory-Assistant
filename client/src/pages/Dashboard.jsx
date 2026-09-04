import { useEffect, useState } from "react";

import {
  MdOutlineNotifications,
  MdOutlineSearch,
  MdOutlineKeyboardArrowDown,
  MdOutlineDescription,
  MdOutlineAccessTime,
  MdOutlineCheckCircle,
  MdOutlineFolder,
  MdOutlineArrowForward,
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
        <path
          d="M0 0 L26 8 V30 Q26 46 0 54 Q-26 46 -26 30 V8 Z"
          fill="#F472B6"
        />
        <path
          d="M-9 26 L-2 33 L11 15"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* aadhaar card */}
      <g transform="translate(150 60) rotate(-6)">
        <rect
          x="-24"
          y="-30"
          width="60"
          height="76"
          rx="6"
          fill="#FBCFE8"
        />
        <circle cx="-8" cy="-10" r="7" fill="#F472B6" opacity="0.8" />
        <rect
          x="-14"
          y="4"
          width="36"
          height="4"
          rx="2"
          fill="#F472B6"
          opacity="0.6"
        />
        <rect
          x="-14"
          y="12"
          width="26"
          height="3"
          rx="1.5"
          fill="#F472B6"
          opacity="0.5"
        />
      </g>

      {/* passport */}
      <g transform="translate(210 45) rotate(6)">
        <rect
          x="-26"
          y="-36"
          width="64"
          height="86"
          rx="6"
          fill="#7C3AED"
        />
        <circle
          cx="6"
          cy="-6"
          r="14"
          fill="none"
          stroke="#FDE68A"
          strokeWidth="2.5"
        />
        <line
          x1="-8"
          y1="-6"
          x2="20"
          y2="-6"
          stroke="#FDE68A"
          strokeWidth="2"
        />
        <rect
          x="-10"
          y="20"
          width="32"
          height="3"
          rx="1.5"
          fill="#FDE68A"
          opacity="0.7"
        />
      </g>

      {/* PAN card */}
      <g transform="translate(120 100) rotate(-4)">
        <rect
          x="-26"
          y="-18"
          width="58"
          height="42"
          rx="6"
          fill="#60A5FA"
        />
        <circle
          cx="-10"
          cy="0"
          r="6"
          fill="#EFF6FF"
          opacity="0.9"
        />
        <rect
          x="0"
          y="-4"
          width="22"
          height="3"
          rx="1.5"
          fill="#EFF6FF"
          opacity="0.7"
        />
        <rect
          x="0"
          y="3"
          width="16"
          height="3"
          rx="1.5"
          fill="#EFF6FF"
          opacity="0.6"
        />
      </g>

      {/* driving license */}
      <g transform="translate(178 108) rotate(4)">
        <rect
          x="-28"
          y="-16"
          width="60"
          height="40"
          rx="6"
          fill="#FDE68A"
        />
        <circle
          cx="18"
          cy="-2"
          r="6"
          fill="#F59E0B"
          opacity="0.8"
        />
        <rect
          x="-16"
          y="-2"
          width="24"
          height="3"
          rx="1.5"
          fill="#B45309"
          opacity="0.6"
        />
        <rect
          x="-16"
          y="5"
          width="18"
          height="3"
          rx="1.5"
          fill="#B45309"
          opacity="0.5"
        />
      </g>

      {/* insurance */}
      <g transform="translate(228 100) rotate(2)">
        <rect
          x="-22"
          y="-18"
          width="48"
          height="46"
          rx="6"
          fill="#C4B5FD"
        />
        <path
          d="M0 -6 L10 -1 V8 Q10 15 0 19 Q-10 15 -10 8 V-1 Z"
          fill="#FFFFFF"
          opacity="0.85"
        />
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

      <rect
        x="40"
        y="150"
        width="232"
        height="10"
        fill="#7C3AED"
        opacity="0.35"
      />

      <circle cx="156" cy="170" r="12" fill="#FDE68A" />
      <circle
        cx="156"
        cy="170"
        r="12"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="3"
      />

      <g transform="translate(20 175)">
        <circle cx="0" cy="0" r="16" fill="#FCD34D" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="Arial"
          fontSize="14"
          fontWeight="bold"
          fill="#B45309"
        >
          $
        </text>
      </g>

      <g transform="translate(290 180)">
        <circle cx="0" cy="0" r="11" fill="#FCD34D" />
      </g>
    </svg>
  );
}

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/documents",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch documents."
          );
        }

        setDocuments(data.documents || []);
      } catch (error) {
        console.error("Dashboard Documents Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Calculate days left
  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    return Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );
  };

  // Document status
  const getStatus = (document) => {
    if (!document.expiryDate) {
      return "Valid";
    }

    const daysLeft = getDaysLeft(document.expiryDate);

    if (daysLeft < 0) {
      return "Expired";
    }

    if (daysLeft <= 30) {
      return "Expiring Soon";
    }

    return "Valid";
  };

  // Statistics
  const totalDocuments = documents.length;

  const expiringSoon = documents.filter((document) => {
    if (!document.expiryDate) return false;

    const daysLeft = getDaysLeft(document.expiryDate);

    return daysLeft >= 0 && daysLeft <= 30;
  }).length;

  const validDocuments = documents.filter(
    (document) => getStatus(document) === "Valid"
  ).length;

  const categoriesCount = new Set(
    documents.map((document) => document.category)
  ).size;

  // Documents with expiry date, sorted by nearest expiry
  const upcomingReminders = [...documents]
    .filter((document) => document.expiryDate)
    .sort(
      (a, b) =>
        new Date(a.expiryDate) -
        new Date(b.expiryDate)
    )
    .slice(0, 4);

  // Search
  const filteredDocuments = documents.filter((document) => {
    const searchText = search.toLowerCase();

    return (
      document.documentName
        ?.toLowerCase()
        .includes(searchText) ||
      document.category
        ?.toLowerCase()
        .includes(searchText) ||
      document.documentNumber
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // Recent documents
  const recentDocuments = filteredDocuments.slice(0, 4);

  return (
    <div className="min-h-screen w-full flex bg-[#F3F1F9]">

      <Sidebar />

      <main className="flex-1 p-6 bg-[#F7F4FF]">

        {/* Hero banner */}
        <div className="rounded-2xl bg-purple-200 p-8 flex items-center justify-between overflow-hidden">

          <div className="max-w-md">

            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Hello, {user?.name || "User"}! <span>👋</span>
            </h1>

            <p className="text-sm text-slate-500 mt-0">
              Welcome to your Digital Memory Assistant
            </p>

            <h2 className="text-[16px] font-bold text-slate-900 leading-snug mb-3 mt-5">
              Keep your important documents{" "}
              <span className="text-violet-600">
                safe &amp; organized
              </span>
            </h2>

            <p className="text-sm text-slate-600">
              Upload, manage and never miss a renewal again.
            </p>

          </div>

          <div className="w-64 h-30 shrink-0">
            <WalletIllustration />
          </div>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-5">

          {/* Total */}
          <div className="rounded-2xl bg-white border border-[#ECE8F7] p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">
                <MdOutlineDescription className="text-2xl text-violet-600" />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "-" : totalDocuments}
                </p>

                <p className="text-xs text-slate-500">
                  Total Documents
                </p>
              </div>

            </div>

          </div>

          {/* Expiring */}
          <div className="rounded-2xl bg-white border border-[#ECE8F7] p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
                <MdOutlineAccessTime className="text-2xl text-orange-500" />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "-" : expiringSoon}
                </p>

                <p className="text-xs text-slate-500">
                  Expiring Soon
                </p>
              </div>

            </div>

          </div>

          {/* Valid */}
          <div className="rounded-2xl bg-white border border-[#ECE8F7] p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center">
                <MdOutlineCheckCircle className="text-2xl text-emerald-500" />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "-" : validDocuments}
                </p>

                <p className="text-xs text-slate-500">
                  Valid Documents
                </p>
              </div>

            </div>

          </div>

          {/* Categories */}
          <div className="rounded-2xl bg-white border border-[#ECE8F7] p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center">
                <MdOutlineFolder className="text-2xl text-violet-600" />
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? "-" : categoriesCount}
                </p>

                <p className="text-xs text-slate-500">
                  Document Categories
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Main lower section */}
        <div className="grid grid-cols-3 gap-5 mt-5">

          {/* Recent Documents */}
          <div className="col-span-2 rounded-2xl bg-white border border-[#ECE8F7] p-5 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-base font-bold text-slate-800">
                Recent Documents
              </h2>

              <a
                href="/documents"
                className="text-xs font-semibold text-violet-600 hover:text-violet-800"
              >
                View All
              </a>

            </div>

            {loading ? (
              <p className="text-sm text-slate-500 py-8 text-center">
                Loading documents...
              </p>
            ) : recentDocuments.length === 0 ? (
              <div className="py-8 text-center">

                <div className="text-3xl">📁</div>

                <p className="mt-2 text-sm font-semibold text-slate-700">
                  No documents yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Upload your first document to see it here.
                </p>

              </div>
            ) : (
              <div className="space-y-2">

                {recentDocuments.map((document) => {

                  const status = getStatus(document);

                  return (
                    <div
                      key={document._id}
                      className="flex items-center justify-between rounded-xl border border-[#ECE8F7] px-3 py-3 hover:bg-[#FAF9FE]"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                          <MdOutlineDescription className="text-xl text-violet-600" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {document.documentName}
                          </p>

                          <p className="text-xs text-slate-400">
                            {document.category}
                            {document.documentNumber
                              ? ` • ${document.documentNumber}`
                              : ""}
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-5">

                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            status === "Expired"
                              ? "bg-red-100 text-red-600"
                              : status === "Expiring Soon"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {status}
                        </span>

                        <span className="text-xs text-slate-400">
                          {new Date(
                            document.createdAt
                          ).toLocaleDateString("en-IN")}
                        </span>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

          {/* Upcoming Reminders */}
          <div className="rounded-2xl bg-white border border-[#ECE8F7] p-5 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-base font-bold text-slate-800">
                Upcoming Reminders
              </h2>

              <a
                href="/reminders"
                className="text-xs font-semibold text-violet-600 hover:text-violet-800"
              >
                View All
              </a>

            </div>

            {loading ? (
              <p className="text-sm text-slate-500 py-8 text-center">
                Loading...
              </p>
            ) : upcomingReminders.length === 0 ? (
              <div className="py-8 text-center">

                <div className="text-3xl">🎉</div>

                <p className="mt-2 text-sm font-semibold text-slate-700">
                  No upcoming reminders
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your documents are looking good.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {upcomingReminders.map((document) => {

                  const daysLeft = getDaysLeft(
                    document.expiryDate
                  );

                  const status = getStatus(document);

                  return (
                    <div
                      key={document._id}
                      className="rounded-xl bg-[#FAF9FE] border border-[#F0ECF8] p-3"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
                          <MdOutlineNotifications className="text-lg text-violet-600" />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {document.documentName}
                          </p>

                          <p className="text-xs text-slate-400">
                            {new Date(
                              document.expiryDate
                            ).toLocaleDateString("en-IN")}
                          </p>

                        </div>

                        <MdOutlineArrowForward className="text-slate-400" />

                      </div>

                      <p
                        className={`mt-2 text-xs font-semibold ${
                          status === "Expired"
                            ? "text-red-600"
                            : daysLeft <= 30
                            ? "text-orange-600"
                            : "text-violet-600"
                        }`}
                      >
                        {daysLeft < 0
                          ? "Expired"
                          : daysLeft === 0
                          ? "Expires today"
                          : daysLeft === 1
                          ? "Expires tomorrow"
                          : `Expires in ${daysLeft} days`}
                      </p>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}