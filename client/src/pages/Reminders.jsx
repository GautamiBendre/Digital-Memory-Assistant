import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Reminders = () => {
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

        // Only current active documents should appear
        const currentDocuments = (data.documents || []).filter(
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
  // CALCULATE DAYS REMAINING
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
    // No expiry date = All Good
    if (!hasExpiry) {
      return "All Good";
    }

    if (daysLeft < 0) {
      return "Expired";
    }

    if (daysLeft <= 30) {
      return "Expiring Soon";
    }

    if (daysLeft <= 90) {
      return "Upcoming";
    }

    return "All Good";
  };

  // =========================================================
  // DOCUMENTS WITH STATUS
  // =========================================================

  const allDocumentsWithStatus = documents.map((document) => {
    const hasExpiry = Boolean(document.expiryDate);

    const daysLeft = hasExpiry
      ? getDaysLeft(document.expiryDate)
      : null;

    return {
      ...document,
      daysLeft,
      hasExpiry,
      status: getStatus(daysLeft, hasExpiry),
    };
  });

  // =========================================================
  // REMINDER DOCUMENTS
  //
  // Only documents WITH expiry dates belong here.
  // No-expiry documents are not reminders.
  // =========================================================

  const reminderDocuments = allDocumentsWithStatus.filter(
    (document) => document.hasExpiry
  );

  // =========================================================
  // EXPIRED
  // =========================================================

  const expired = reminderDocuments.filter(
    (document) => document.daysLeft < 0
  );

  // =========================================================
  // EXPIRING SOON
  // 0 - 30 DAYS
  // =========================================================

  const expiringSoon = reminderDocuments.filter(
    (document) =>
      document.daysLeft >= 0 &&
      document.daysLeft <= 30
  );

  // =========================================================
  // UPCOMING
  // 31 - 90 DAYS
  // =========================================================

  const upcoming = reminderDocuments.filter(
    (document) =>
      document.daysLeft > 30 &&
      document.daysLeft <= 90
  );

  // =========================================================
  // ALL GOOD
  //
  // Includes:
  // 1. Documents with NO expiry date
  // 2. Documents whose expiry is more than 90 days away
  // =========================================================

  const allGood = allDocumentsWithStatus.filter(
    (document) =>
      !document.hasExpiry ||
      document.daysLeft > 90
  );

  // =========================================================
  // FILTER TABS
  // =========================================================

  const filteredDocuments =
    activeTab === "all"
      ? reminderDocuments
      : activeTab === "expired"
      ? expired
      : activeTab === "expiring"
      ? expiringSoon
      : upcoming;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen flex bg-[#F3F1F9]">

      <Sidebar />

      <main className="flex-1 bg-[#F7F4FF] p-5">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-5">

          <h1 className="text-2xl font-bold text-violet-700">
            Reminders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Get notified before your important documents expire.
          </p>

        </div>

        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <div className="mb-5 grid grid-cols-4 gap-3">

          {/* Expiring Soon */}

          <div className="rounded-xl border border-red-100 bg-red-50 p-3 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-lg">
                ⚠️
              </div>

              <div>

                <p className="text-sm font-semibold text-red-700">
                  Expiring Soon
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {expiringSoon.length}
                </p>

                <p className="text-xs text-slate-500">
                  Within 30 days
                </p>

              </div>

            </div>

          </div>

          {/* Upcoming */}

          <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-3 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-lg">
                🕐
              </div>

              <div>

                <p className="text-sm font-semibold text-yellow-700">
                  Upcoming
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {upcoming.length}
                </p>

                <p className="text-xs text-slate-500">
                  Within 3 months
                </p>

              </div>

            </div>

          </div>

          {/* All Good */}

          <div className="rounded-xl border border-green-100 bg-green-50 p-3 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">
                ✓
              </div>

              <div>

                <p className="text-sm font-semibold text-green-700">
                  All Good
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {allGood.length}
                </p>

                <p className="text-xs text-slate-500">
                  No expiry / more than 3 months
                </p>

              </div>

            </div>

          </div>

          {/* Expired */}

          <div className="rounded-xl border border-red-100 bg-red-50 p-3 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-lg">
                ✕
              </div>

              <div>

                <p className="text-sm font-semibold text-red-700">
                  Expired
                </p>

                <p className="text-2xl font-bold text-slate-800">
                  {expired.length}
                </p>

                <p className="text-xs text-slate-500">
                  Already expired
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* TABS */}
        {/* ================================================= */}

        <div className="mb-4 flex items-center gap-6 border-b border-[#E5E0F2]">

          {/* All */}

          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "all"
                ? "border-b-2 border-violet-600 text-violet-700"
                : "text-slate-500"
            }`}
          >
            All Reminders ({reminderDocuments.length})
          </button>

          {/* Expired */}

          <button
            onClick={() => setActiveTab("expired")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "expired"
                ? "border-b-2 border-violet-600 text-violet-700"
                : "text-slate-500"
            }`}
          >
            Expired ({expired.length})
          </button>

          {/* Expiring */}

          <button
            onClick={() => setActiveTab("expiring")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "expiring"
                ? "border-b-2 border-violet-600 text-violet-700"
                : "text-slate-500"
            }`}
          >
            Expiring Soon ({expiringSoon.length})
          </button>

          {/* Upcoming */}

          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "upcoming"
                ? "border-b-2 border-violet-600 text-violet-700"
                : "text-slate-500"
            }`}
          >
            Upcoming ({upcoming.length})
          </button>

        </div>

        {/* ================================================= */}
        {/* DOCUMENTS */}
        {/* ================================================= */}

        <div className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

          {loading ? (

            <p className="py-8 text-center text-sm text-slate-500">
              Loading reminders...
            </p>

          ) : filteredDocuments.length === 0 ? (

            <div className="py-10 text-center">

              <div className="text-4xl">
                🎉
              </div>

              <h3 className="mt-3 text-base font-semibold text-slate-700">
                No reminders
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                You don't have any documents in this reminder category.
              </p>

            </div>

          ) : (

            <div className="overflow-hidden rounded-lg border border-[#ECE8F7]">

              {/* Table Header */}

              <div className="grid grid-cols-5 bg-[#F8F6FC] px-4 py-3 text-xs font-semibold text-slate-500">

                <span>Document</span>
                <span>Category</span>
                <span>Expiry Date</span>
                <span>Days Left</span>
                <span>Status</span>

              </div>

              {/* Documents */}

              {filteredDocuments.map((document) => (

                <div
                  key={document._id}
                  className="grid grid-cols-5 items-center border-t border-[#ECE8F7] px-4 py-3"
                >

                  {/* Document */}

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                      📄
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-slate-700">
                        {document.documentName}
                      </p>

                      {document.documentNumber && (
                        <p className="text-xs text-slate-400">
                          {document.documentNumber}
                        </p>
                      )}

                    </div>

                  </div>

                  {/* Category */}

                  <span className="text-xs text-slate-600">
                    {document.category}
                  </span>

                  {/* Expiry */}

                  <span className="text-xs text-slate-600">

                    {document.expiryDate
                      ? new Date(
                          document.expiryDate
                        ).toLocaleDateString("en-IN")
                      : "No expiry"}

                  </span>

                  {/* Days Left */}

                  <span
                    className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                      document.daysLeft < 0
                        ? "bg-red-100 text-red-600"
                        : document.daysLeft <= 30
                        ? "bg-red-100 text-red-600"
                        : document.daysLeft <= 90
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >

                    {document.daysLeft === null
                      ? "No expiry"
                      : document.daysLeft < 0
                      ? "Expired"
                      : `${document.daysLeft} days`}

                  </span>

                  {/* Status */}

                  <span
                    className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                      document.status === "Expired"
                        ? "bg-red-100 text-red-600"
                        : document.status === "Expiring Soon"
                        ? "bg-red-100 text-red-600"
                        : document.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {document.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* BOTTOM INFO */}
        {/* ================================================= */}

        <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-xl">
              🔔
            </div>

            <div>

              <h3 className="text-sm font-semibold text-violet-700">
                Never miss an important date!
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                MemoryVault will help you keep track of your document
                expiry dates.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Reminders;