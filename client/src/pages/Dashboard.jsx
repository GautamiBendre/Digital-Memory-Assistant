import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MdOutlineNotifications,
  MdOutlineDescription,
  MdOutlineAccessTime,
  MdOutlineCheckCircle,
  MdOutlineFolder,
  MdOutlineArrowForward,
  MdCloudUpload,
  MdFolderOpen,
  MdPersonOutline,
} from "react-icons/md";

import Sidebar from "../components/Sidebar";

// =========================================================
// WALLET ILLUSTRATION
// =========================================================

function WalletIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <linearGradient
          id="pouch"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* Decorative circles */}
      <circle
        cx="60"
        cy="30"
        r="10"
        fill="#FBCFE8"
        opacity="0.7"
      />

      <circle
        cx="280"
        cy="50"
        r="7"
        fill="#FDE68A"
        opacity="0.8"
      />

      <circle
        cx="20"
        cy="150"
        r="6"
        fill="#FBCFE8"
        opacity="0.6"
      />

      <ellipse
        cx="45"
        cy="90"
        rx="16"
        ry="12"
        fill="#E9D5FF"
        opacity="0.7"
      />

      {/* Shield */}
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

      {/* Aadhaar */}
      <g transform="translate(150 60) rotate(-6)">
        <rect
          x="-24"
          y="-30"
          width="60"
          height="76"
          rx="6"
          fill="#FBCFE8"
        />

        <circle
          cx="-8"
          cy="-10"
          r="7"
          fill="#F472B6"
          opacity="0.8"
        />

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

      {/* Passport */}
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

      {/* PAN */}
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

      {/* Driving License */}
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

      {/* Insurance */}
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

      {/* Wallet */}
      <path
        d="
          M40 140
          Q40 128 52 128
          H260
          Q272 128 272 140
          V200
          Q272 212 260 212
          H52
          Q40 212 40 200
          Z
        "
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

      <circle
        cx="156"
        cy="170"
        r="12"
        fill="#FDE68A"
      />

      <circle
        cx="156"
        cy="170"
        r="12"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="3"
      />

      <g transform="translate(20 175)">
        <circle
          cx="0"
          cy="0"
          r="16"
          fill="#FCD34D"
        />

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
        <circle
          cx="0"
          cy="0"
          r="11"
          fill="#FCD34D"
        />
      </g>
    </svg>
  );
}

// =========================================================
// DASHBOARD
// =========================================================

export default function DashboardHome() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // FETCH DOCUMENTS
  // =========================================================

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

        const currentDocuments =
          (data.documents || []).filter(
            (document) =>
              document.status === "active" &&
              document.isCurrent === true
          );

        setDocuments(currentDocuments);
      } catch (error) {
        console.error(
          "Dashboard Documents Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // =========================================================
  // DAYS LEFT
  // =========================================================

  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;

    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    return Math.ceil(
      (expiry - today) /
        (1000 * 60 * 60 * 24)
    );
  };

  // =========================================================
  // STATUS
  // =========================================================

  const getStatus = (document) => {
    if (!document.expiryDate) {
      return "Valid";
    }

    const daysLeft = getDaysLeft(
      document.expiryDate
    );

    if (daysLeft < 0) {
      return "Expired";
    }

    if (daysLeft <= 30) {
      return "Expiring Soon";
    }

    if (daysLeft <= 90) {
      return "Upcoming";
    }

    return "Valid";
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalDocuments = documents.length;

  const expiringSoon = documents.filter(
    (document) => {
      if (!document.expiryDate) return false;

      const daysLeft = getDaysLeft(
        document.expiryDate
      );

      return (
        daysLeft >= 0 &&
        daysLeft <= 30
      );
    }
  ).length;

  const validDocuments = documents.filter(
    (document) =>
      getStatus(document) === "Valid"
  ).length;

  const categoriesCount = new Set(
    documents.map(
      (document) => document.category
    )
  ).size;

  // =========================================================
  // PRIORITY DOCUMENTS
  // =========================================================

  const priorityDocuments = [...documents]
    .filter(
      (document) => document.expiryDate
    )
    .sort(
      (a, b) =>
        new Date(a.expiryDate) -
        new Date(b.expiryDate)
    )
    .slice(0, 5);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "No expiry";

    return new Date(date).toLocaleDateString(
      "en-IN"
    );
  };

  // =========================================================
  // DAYS LABEL
  // =========================================================

  const getDaysLabel = (daysLeft) => {
    if (daysLeft < 0) {
      return `${Math.abs(daysLeft)} days overdue`;
    }

    if (daysLeft === 0) {
      return "Expires today";
    }

    if (daysLeft === 1) {
      return "1 day";
    }

    return `${daysLeft} days`;
  };

  // =========================================================
  // PRIORITY STYLES
  // =========================================================

  const getPriorityStyles = (document) => {
    const status = getStatus(document);

    if (status === "Expired") {
      return {
        days: "bg-red-50 text-red-600",
        status: "bg-red-50 text-red-600",
      };
    }

    if (status === "Expiring Soon") {
      return {
        days: "bg-red-50 text-red-600",
        status: "bg-red-50 text-red-600",
      };
    }

    if (status === "Upcoming") {
      return {
        days: "bg-amber-50 text-amber-600",
        status: "bg-amber-50 text-amber-600",
      };
    }

    return {
      days: "bg-emerald-50 text-emerald-600",
      status: "bg-emerald-50 text-emerald-600",
    };
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex min-h-screen w-full bg-[#F3F1F9]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 overflow-x-hidden bg-[#F7F4FF] p-6">

        {/* ================================================= */}
        {/* HERO BANNER */}
        {/* ================================================= */}

        <div className="mb-5 flex h-[145px] items-center justify-between overflow-hidden rounded-2xl bg-purple-200 px-7">

          <div className="flex-1">

            <h1 className="text-[19px] font-bold leading-tight text-slate-900">
              Hello, {user?.name || "User"}! 👋
            </h1>

            <h2 className="mt-4 text-[17px] font-bold leading-tight text-slate-900">
              Keep your important documents{" "}
              <span className="text-violet-600">
                safe &amp; organized
              </span>
            </h2>

            <p className="mt-1.5 text-sm text-slate-600">
              Upload, manage and never miss a renewal again.
            </p>

          </div>

          <div className="h-[125px] w-[210px] shrink-0">
            <WalletIllustration />
          </div>

        </div>


        {/* ================================================= */}
        {/* STATS + QUICK ACTIONS */}
        {/* ================================================= */}

        <div className="grid grid-cols-[160px_160px_360px] gap-3">

          {/* ================================================= */}
          {/* STATISTICS */}
          {/* ================================================= */}

          <div className="col-span-2 grid grid-cols-2 gap-3">

            {/* TOTAL DOCUMENTS */}

            <div className="flex h-[100px] w-[160px] items-center rounded-2xl border border-[#ECE8F7] bg-white px-3 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100">
                  <MdOutlineDescription className="text-xl text-violet-600" />
                </div>

                <div>
                  <p className="text-xl font-bold leading-none text-slate-900">
                    {loading ? "-" : totalDocuments}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Total Documents
                  </p>
                </div>

              </div>

            </div>


            {/* EXPIRING SOON */}

            <div className="flex h-[100px] w-[160px] items-center rounded-2xl border border-[#ECE8F7] bg-white px-3 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <MdOutlineAccessTime className="text-xl text-orange-500" />
                </div>

                <div>
                  <p className="text-xl font-bold leading-none text-slate-900">
                    {loading ? "-" : expiringSoon}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Expiring Soon
                  </p>
                </div>

              </div>

            </div>


            {/* VALID DOCUMENTS */}

            <div className="flex h-[100px] w-[160px] items-center rounded-2xl border border-[#ECE8F7] bg-white px-3 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <MdOutlineCheckCircle className="text-xl text-emerald-500" />
                </div>

                <div>
                  <p className="text-xl font-bold leading-none text-slate-900">
                    {loading ? "-" : validDocuments}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Valid Documents
                  </p>
                </div>

              </div>

            </div>


            {/* DOCUMENT CATEGORIES */}

            <div className="flex h-[100px] w-[160px] items-center rounded-2xl border border-[#ECE8F7] bg-white px-3 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100">
                  <MdOutlineFolder className="text-xl text-violet-600" />
                </div>

                <div>
                  <p className="text-xl font-bold leading-none text-slate-900">
                    {loading ? "-" : categoriesCount}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Document Categories
                  </p>
                </div>

              </div>

            </div>

          </div>


         {/* ================================================= */}
{/* QUICK ACTIONS */}
{/* ================================================= */}

<div className="h-[212px] w-[320px] rounded-2xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

  <h2 className="mb-3 text-base font-bold text-slate-900">
    Quick Actions
  </h2>

  <div className="grid grid-cols-2 gap-3">

    {/* UPLOAD */}

    <button
      onClick={() => navigate("/upload")}
      className="flex h-[64px] w-full flex-col items-center justify-center rounded-xl border border-[#ECE8F7] bg-[#FCFAFF] transition hover:border-violet-200 hover:bg-violet-50"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
        <MdCloudUpload className="text-base" />
      </div>

      <p className="mt-1 text-xs font-semibold leading-none text-slate-700">
        Upload
      </p>

      <p className="mt-1 text-[10px] leading-none text-slate-400">
        Document
      </p>
    </button>


    {/* VIEW ALL */}

    <button
      onClick={() => navigate("/documents")}
      className="flex h-[64px] w-full flex-col items-center justify-center rounded-xl border border-[#ECE8F7] bg-[#FCFAFF] transition hover:border-violet-200 hover:bg-violet-50"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
        <MdFolderOpen className="text-base" />
      </div>

      <p className="mt-1 text-xs font-semibold leading-none text-slate-700">
        View All
      </p>

      <p className="mt-1 text-[10px] leading-none text-slate-400">
        Documents
      </p>
    </button>


    {/* REMINDERS */}

    <button
      onClick={() => navigate("/reminders")}
      className="flex h-[64px] w-full flex-col items-center justify-center rounded-xl border border-[#FDE2E2] bg-[#FFFDFD] transition hover:border-red-200 hover:bg-red-50"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-500">
        <MdOutlineNotifications className="text-base" />
      </div>

      <p className="mt-1 text-xs font-semibold leading-none text-slate-700">
        Check
      </p>

      <p className="mt-1 text-[10px] leading-none text-slate-400">
        Reminders
      </p>
    </button>


    {/* PROFILE */}

    <button
      onClick={() => navigate("/profile")}
      className="flex h-[64px] w-full flex-col items-center justify-center rounded-xl border border-[#ECE8F7] bg-[#FCFAFF] transition hover:border-violet-200 hover:bg-violet-50"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
        <MdPersonOutline className="text-base" />
      </div>

      <p className="mt-1 text-xs font-semibold leading-none text-slate-700">
        Manage
      </p>

      <p className="mt-1 text-[10px] leading-none text-slate-400">
        Profile
      </p>
    </button>

  </div>

</div>
        </div>


        {/* ================================================= */}
        {/* PRIORITY REMINDERS + EXPIRY TIMELINE */}
        {/* ================================================= */}

        <div className="mt-4 grid grid-cols-3 gap-4">

          {/* ================================================= */}
          {/* PRIORITY REMINDERS */}
          {/* ================================================= */}

          <div className="col-span-2 rounded-2xl border border-[#ECE8F7] bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-start justify-between">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Priority Reminders
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Documents sorted by expiry date
                  (earliest first).
                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/reminders")
                }
                className="flex items-center gap-1 rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100"
              >
                View All
                <MdOutlineArrowForward />
              </button>

            </div>


            {loading ? (

              <div className="py-10 text-center text-sm text-slate-400">
                Loading documents...
              </div>

            ) : priorityDocuments.length === 0 ? (

              <div className="rounded-xl border border-dashed border-[#E8E1F3] py-10 text-center">

                <MdOutlineCheckCircle className="mx-auto text-3xl text-emerald-500" />

                <p className="mt-2 text-sm font-semibold text-slate-700">
                  No expiry dates to track
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your documents are looking good.
                </p>

              </div>

            ) : (

              <div className="space-y-2">

                {priorityDocuments.map(
                  (document) => {

                    const daysLeft =
                      getDaysLeft(
                        document.expiryDate
                      );

                    const status =
                      getStatus(document);

                    const styles =
                      getPriorityStyles(
                        document
                      );

                    return (
                      <div
                        key={document._id}
                        className="flex items-center gap-4 rounded-xl border border-[#ECE8F7] px-4 py-3 transition hover:bg-[#FBFAFF]"
                      >

                        {/* ICON */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                          <MdOutlineDescription className="text-xl text-violet-500" />
                        </div>


                        {/* DOCUMENT INFO */}

                        <div className="min-w-0 flex-1">

                          <p
                            title={
                              document.documentName
                            }
                            className="truncate text-sm font-semibold text-slate-800"
                          >
                            {document.documentName}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-slate-400">
                            {document.category}

                            {document.documentNumber
                              ? ` • ${document.documentNumber}`
                              : ""}
                          </p>

                        </div>


                        {/* EXPIRY DATE */}

                        <div className="hidden min-w-[85px] sm:block">

                          <p className="text-[10px] text-slate-400">
                            Expiry
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-600">
                            {formatDate(
                              document.expiryDate
                            )}
                          </p>

                        </div>


                        {/* DAYS */}

                        <span
                          className={`
                            whitespace-nowrap
                            rounded-full
                            px-3
                            py-1.5
                            text-[10px]
                            font-semibold
                            ${styles.days}
                          `}
                        >
                          {getDaysLabel(
                            daysLeft
                          )}
                        </span>


                        {/* STATUS */}

                        <span
                          className={`
                            hidden
                            whitespace-nowrap
                            rounded-full
                            px-3
                            py-1.5
                            text-[10px]
                            font-semibold
                            md:inline-flex
                            ${styles.status}
                          `}
                        >
                          {status}
                        </span>


                        {/* ARROW */}

                        <button
                          onClick={() =>
                            navigate(
                              "/reminders"
                            )
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                        >
                          <MdOutlineArrowForward />
                        </button>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>


          {/* ================================================= */}
          {/* EXPIRY TIMELINE */}
          {/* ================================================= */}

          <div className="rounded-2xl border border-[#ECE8F7] bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Expiry Timeline
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Upcoming document dates
                </p>

              </div>

              <button
                onClick={() =>
                  navigate("/reminders")
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-violet-600 transition hover:bg-violet-100"
              >
                <MdOutlineArrowForward />
              </button>

            </div>


            {priorityDocuments.length === 0 ? (

              <p className="py-5 text-center text-xs text-slate-400">
                No expiry dates available.
              </p>

            ) : (

              <div className="relative space-y-5">

                {/* TIMELINE LINE */}

                <div className="absolute bottom-4 left-[5px] top-4 w-px bg-[#E9E2F2]" />


                {priorityDocuments
                  .slice(0, 4)
                  .map((document) => {

                    const daysLeft =
                      getDaysLeft(
                        document.expiryDate
                      );

                    const status =
                      getStatus(document);

                    let dotColor =
                      "bg-emerald-500";

                    let textColor =
                      "text-emerald-600";

                    if (
                      status ===
                      "Expiring Soon"
                    ) {
                      dotColor =
                        "bg-red-500";

                      textColor =
                        "text-red-600";
                    }

                    if (
                      status === "Upcoming"
                    ) {
                      dotColor =
                        "bg-amber-500";

                      textColor =
                        "text-amber-600";
                    }

                    if (
                      status === "Expired"
                    ) {
                      dotColor =
                        "bg-red-600";

                      textColor =
                        "text-red-600";
                    }

                    return (
                      <div
                        key={document._id}
                        className="relative flex gap-3"
                      >

                        {/* DOT */}

                        <div
                          className={`
                            relative
                            z-10
                            mt-1
                            h-3
                            w-3
                            shrink-0
                            rounded-full
                            ring-4
                            ring-white
                            ${dotColor}
                          `}
                        />


                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <p
                              className={`
                                text-xs
                                font-bold
                                ${textColor}
                              `}
                            >
                              {getDaysLabel(
                                daysLeft
                              )}
                            </p>

                            <p className="shrink-0 text-[10px] text-slate-400">
                              {formatDate(
                                document.expiryDate
                              )}
                            </p>

                          </div>

                          <p
                            title={
                              document.documentName
                            }
                            className="mt-1 truncate text-xs font-medium text-slate-600"
                          >
                            {document.documentName}
                          </p>

                        </div>

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