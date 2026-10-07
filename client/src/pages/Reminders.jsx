import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const Reminders = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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

        const currentDocuments = (
          data.documents || []
        ).filter(
          (document) =>
            document.status === "active" &&
            document.isCurrent === true
        );

        setDocuments(currentDocuments);
      } catch (error) {
        console.error(
          "Fetch Reminder Documents Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // =========================================================
  // CALCULATE DAYS LEFT
  // =========================================================

  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;

    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const difference = expiry - today;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // =========================================================
  // GET STATUS
  // =========================================================

  const getStatus = (daysLeft, hasExpiry) => {
    if (!hasExpiry) return "All Good";

    if (daysLeft < 0) return "Expired";

    if (daysLeft <= 30) return "Expiring Soon";

    if (daysLeft <= 90) return "Upcoming";

    return "All Good";
  };

  // =========================================================
  // DOCUMENT DATA
  // =========================================================

  const allDocumentsWithStatus = documents.map(
    (document) => {
      const hasExpiry = Boolean(
        document.expiryDate
      );

      const daysLeft = hasExpiry
        ? getDaysLeft(document.expiryDate)
        : null;

      return {
        ...document,
        daysLeft,
        hasExpiry,
        status: getStatus(
          daysLeft,
          hasExpiry
        ),
      };
    }
  );

  // =========================================================
  // DOCUMENT GROUPS
  // =========================================================

  const reminderDocuments =
    allDocumentsWithStatus.filter(
      (document) => document.hasExpiry
    );

  const expired = reminderDocuments.filter(
    (document) => document.daysLeft < 0
  );

  const expiringSoon =
    reminderDocuments.filter(
      (document) =>
        document.daysLeft >= 0 &&
        document.daysLeft <= 30
    );

  const upcoming = reminderDocuments.filter(
    (document) =>
      document.daysLeft > 30 &&
      document.daysLeft <= 90
  );

  const allGood = allDocumentsWithStatus.filter(
    (document) =>
      !document.hasExpiry ||
      document.daysLeft > 90
  );

  // =========================================================
  // PRIORITY SORTING
  //
  // 1. Expired
  // 2. Expiring Soon
  // 3. Upcoming
  // 4. All Good
  //
  // Within each group:
  // Most urgent expiry comes first.
  // =========================================================

  const getPriority = (status) => {
    if (status === "Expired") return 1;

    if (status === "Expiring Soon") return 2;

    if (status === "Upcoming") return 3;

    return 4;
  };

  const sortByPriority = (list) => {
    return [...list].sort((a, b) => {
      const priorityDifference =
        getPriority(a.status) -
        getPriority(b.status);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      // For expired:
      // more overdue first.
      //
      // For upcoming/expiring:
      // fewer days left first.
      return a.daysLeft - b.daysLeft;
    });
  };

  // =========================================================
  // ACTIVE TAB
  // =========================================================

  const filteredDocuments =
    activeTab === "all"
      ? sortByPriority(reminderDocuments)
      : activeTab === "expired"
      ? sortByPriority(expired)
      : activeTab === "expiring"
      ? sortByPriority(expiringSoon)
      : sortByPriority(upcoming);

  // =========================================================
  // STATUS STYLES
  // =========================================================

  const getStatusStyle = (status) => {
    if (status === "Expired") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Expiring Soon") {
      return "bg-orange-100 text-orange-600";
    }

    if (status === "Upcoming") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-emerald-100 text-emerald-600";
  };

  // =========================================================
  // DAYS LEFT STYLES
  // =========================================================

  const getDaysStyle = (days) => {
    if (days === null) {
      return "bg-slate-50 text-slate-500";
    }

    if (days < 0) {
      return "bg-red-100 text-red-700";
    }

    if (days <= 30) {
      return "bg-orange-100 text-orange-600";
    }

    if (days <= 90) {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-emerald-100 text-emerald-600";
  };

  // =========================================================
  // DAYS LABEL
  // =========================================================

  const getDaysLabel = (days) => {
    if (days === null) {
      return "—";
    }

    if (days < 0) {
      const overdueDays = Math.abs(days);

      return overdueDays === 1
        ? "1 day overdue"
        : `${overdueDays} days overdue`;
    }

    if (days === 0) {
      return "Today";
    }

    if (days === 1) {
      return "1 day";
    }

    return `${days} days`;
  };

  // =========================================================
  // SUMMARY CARD
  // =========================================================

  const SummaryCard = ({
    icon,
    title,
    count,
    description,
    color,
  }) => {
    const colors = {
      red: {
        card:
          "bg-[#FFF1F1] border-[#FFD9D9]",
        icon:
          "bg-[#FFE1E1] text-red-600",
        title: "text-red-600",
        count: "text-slate-800",
      },

      orange: {
        card:
          "bg-[#FFF5EE] border-[#FFDCC8]",
        icon:
          "bg-[#FFE9DC] text-orange-600",
        title: "text-orange-600",
        count: "text-slate-800",
      },

      amber: {
        card:
          "bg-[#FFFBEA] border-[#F5E7A8]",
        icon:
          "bg-[#FFF2BF] text-amber-600",
        title: "text-amber-700",
        count: "text-slate-800",
      },

      green: {
        card:
          "bg-[#EFFBF5] border-[#CBEFDF]",
        icon:
          "bg-[#DDF8EA] text-emerald-600",
        title: "text-emerald-700",
        count: "text-slate-800",
      },
    };

    const style = colors[color];

    return (
      <div
        className={`
          flex
          min-w-0
          items-center
          gap-3
          rounded-xl
          border
          ${style.card}
          px-4
          py-3
        `}
      >
        {/* ICON */}

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            text-lg
            ${style.icon}
          `}
        >
          {icon}
        </div>

        {/* TEXT */}

        <div className="min-w-0 flex-1">

          {/* TITLE */}

          <p
            className={`
              whitespace-nowrap
              text-xs
              font-semibold
              leading-4
              ${style.title}
            `}
          >
            {title}
          </p>

          {/* COUNT + DESCRIPTION */}

          <div className="mt-1 flex min-w-0 items-center gap-2">

            <p
              className={`
                shrink-0
                text-2xl
                font-bold
                leading-none
                ${style.count}
              `}
            >
              {count}
            </p>

            <p className="whitespace-nowrap text-[10px] font-medium text-slate-500">
              {description}
            </p>

          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#F3F1F9]">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <Sidebar />

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="min-w-0 flex-1 overflow-x-hidden bg-[#F7F4FF] px-5 py-5">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-5">

          <h1 className="text-[26px] font-bold tracking-tight text-violet-700">
            Reminders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Stay on top of your important document expiry dates.
          </p>

        </div>

        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="mb-5 grid grid-cols-4 gap-3">

          {/* EXPIRING SOON */}

          <SummaryCard
            icon="⚠"
            title="Expiring Soon"
            count={expiringSoon.length}
            description="≤ 30 days"
            color="orange"
          />

          {/* UPCOMING */}

          <SummaryCard
            icon="◷"
            title="Upcoming"
            count={upcoming.length}
            description="31–90 days"
            color="amber"
          />

          {/* ALL GOOD */}

          <SummaryCard
            icon="✓"
            title="All Good"
            count={allGood.length}
            description="No action"
            color="green"
          />

          {/* EXPIRED */}

          <SummaryCard
            icon="×"
            title="Expired"
            count={expired.length}
            description="Renew it"
            color="red"
          />

        </div>

        {/* ================================================= */}
        {/* TABS */}
        {/* ================================================= */}

        <div className="mb-4 flex items-center gap-1 border-b border-[#E4DEEF]">

          {/* ALL */}

          <button
            onClick={() =>
              setActiveTab("all")
            }
            className={`
              relative
              px-4
              pb-3
              text-sm
              font-semibold
              transition
              ${
                activeTab === "all"
                  ? "text-violet-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            All Reminders

            <span className="ml-1 text-xs text-slate-400">
              ({reminderDocuments.length})
            </span>

            {activeTab === "all" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-violet-600" />
            )}
          </button>

          {/* EXPIRED */}

          <button
            onClick={() =>
              setActiveTab("expired")
            }
            className={`
              relative
              px-4
              pb-3
              text-sm
              font-semibold
              transition
              ${
                activeTab === "expired"
                  ? "text-violet-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            Expired

            <span className="ml-1 text-xs text-slate-400">
              ({expired.length})
            </span>

            {activeTab === "expired" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-violet-600" />
            )}
          </button>

          {/* EXPIRING SOON */}

          <button
            onClick={() =>
              setActiveTab("expiring")
            }
            className={`
              relative
              px-4
              pb-3
              text-sm
              font-semibold
              transition
              ${
                activeTab === "expiring"
                  ? "text-violet-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            Expiring Soon

            <span className="ml-1 text-xs text-slate-400">
              ({expiringSoon.length})
            </span>

            {activeTab === "expiring" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-violet-600" />
            )}
          </button>

          {/* UPCOMING */}

          <button
            onClick={() =>
              setActiveTab("upcoming")
            }
            className={`
              relative
              px-4
              pb-3
              text-sm
              font-semibold
              transition
              ${
                activeTab === "upcoming"
                  ? "text-violet-700"
                  : "text-slate-500 hover:text-slate-700"
              }
            `}
          >
            Upcoming

            <span className="ml-1 text-xs text-slate-400">
              ({upcoming.length})
            </span>

            {activeTab === "upcoming" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-violet-600" />
            )}
          </button>

        </div>

        {/* ================================================= */}
        {/* DOCUMENTS */}
        {/* ================================================= */}

        <div className="overflow-hidden rounded-xl border border-[#E6E0EF] bg-white shadow-sm">

          {/* DOCUMENT HEADER */}

          <div className="flex items-center justify-between border-b border-[#EEEAF4] px-5 py-3">

            <div>

              <h2 className="text-sm font-semibold text-slate-800">
                Documents
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-400">
                {filteredDocuments.length} document
                {filteredDocuments.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>

          </div>

          {/* LOADING */}

          {loading ? (
            <div className="py-12 text-center">

              <p className="text-sm text-slate-500">
                Loading reminders...
              </p>

            </div>
          ) : filteredDocuments.length === 0 ? (

            /* EMPTY STATE */

            <div className="py-14 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
                ✓
              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-700">
                No reminders
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                No documents are available in this category.
              </p>

            </div>
          ) : (

            <div className="w-full">

              {/* ================================================= */}
              {/* TABLE HEADER */}
              {/* ================================================= */}

              <div
                className="
                  grid
                  grid-cols-[minmax(170px,2.4fr)_0.8fr_1fr_0.75fr_1.05fr_90px]
                  items-center
                  gap-3
                  border-b
                  border-[#EEEAF4]
                  bg-[#FBFAFD]
                  px-5
                  py-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                <span>Document</span>

                <span>Category</span>

                <span>Expiry Date</span>

                <span>Days Left</span>

                <span>Status</span>

                <span className="text-right">
                  Action
                </span>
              </div>

              {/* ================================================= */}
              {/* DOCUMENT ROWS */}
              {/* ================================================= */}

              {filteredDocuments.map(
                (document, index) => (
                  <div
                    key={document._id}
                    className={`
                      grid
                      grid-cols-[minmax(170px,2.4fr)_0.8fr_1fr_0.75fr_1.05fr_90px]
                      items-center
                      gap-3
                      px-5
                      py-3.5
                      transition
                      hover:bg-[#FCFBFF]
                      ${
                        index !== 0
                          ? "border-t border-[#F0EDF5]"
                          : ""
                      }
                    `}
                  >

                    {/* DOCUMENT */}

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-sm">
                        📄
                      </div>

                      <div className="min-w-0">

                        <p
                          title={
                            document.documentName
                          }
                          className="truncate text-[13px] font-semibold text-slate-700"
                        >
                          {document.documentName}
                        </p>

                        {document.documentNumber && (
                          <p
                            title={
                              document.documentNumber
                            }
                            className="mt-0.5 truncate text-[10px] text-slate-400"
                          >
                            {document.documentNumber}
                          </p>
                        )}

                      </div>
                    </div>

                    {/* CATEGORY */}

                    <span className="truncate text-xs text-slate-600">
                      {document.category}
                    </span>

                    {/* EXPIRY DATE */}

                    <span className="text-xs text-slate-600">
                      {document.expiryDate
                        ? new Date(
                            document.expiryDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "No expiry"}
                    </span>

                    {/* DAYS LEFT */}

                    <div>

                      <span
                        className={`
                          inline-flex
                          whitespace-nowrap
                          rounded-full
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          ${getDaysStyle(
                            document.daysLeft
                          )}
                        `}
                      >
                        {getDaysLabel(
                          document.daysLeft
                        )}
                      </span>

                    </div>

                    {/* STATUS */}

                    <div>

                      <span
                        className={`
                          inline-flex
                          whitespace-nowrap
                          rounded-full
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          ${getStatusStyle(
                            document.status
                          )}
                        `}
                      >
                        {document.status}
                      </span>

                    </div>

                    {/* ACTION */}

                    <div className="flex justify-end">

                      {/* EXPIRING SOON */}

                      {document.status ===
                        "Expiring Soon" && (
                        <button
                          onClick={() =>
                            navigate(
                              `/upload?renew=true&documentId=${document._id}`
                            )
                          }
                          className="
                            whitespace-nowrap
                            rounded-lg
                            bg-violet-600
                            px-3
                            py-2
                            text-[10px]
                            font-semibold
                            text-white
                            transition
                            hover:bg-violet-700
                            active:scale-[0.98]
                          "
                        >
                          Renew
                        </button>
                      )}

                      {/* EXPIRED */}

                      {document.status ===
                        "Expired" && (
                        <button
                          onClick={() =>
                            navigate(
                              `/upload?renew=true&documentId=${document._id}`
                            )
                          }
                          className="
                            whitespace-nowrap
                            rounded-lg
                            border
                            border-violet-200
                            bg-violet-50
                            px-3
                            py-2
                            text-[10px]
                            font-semibold
                            text-violet-700
                            transition
                            hover:bg-violet-100
                          "
                        >
                          Renew
                        </button>
                      )}

                      {/* UPCOMING / ALL GOOD */}

                      {document.status !==
                        "Expiring Soon" &&
                        document.status !==
                          "Expired" && (
                          <span className="text-xs text-slate-300">
                            —
                          </span>
                        )}

                    </div>
                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* INFO BANNER */}
        {/* ================================================= */}

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-sm">
            🔔
          </div>

          <div className="min-w-0">

            <p className="text-xs font-semibold text-violet-700">
              Never miss an important date
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              MemoryVault keeps track of your document expiry dates
              and reminds you when renewal is approaching.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Reminders;