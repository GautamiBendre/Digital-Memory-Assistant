import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const categories = [
  {
    name: "Personal",
    icon: "👤",
    description: "Personal and family documents",
  },
  {
    name: "Educational",
    icon: "🎓",
    description: "Certificates, marksheets and degrees",
  },
  {
    name: "Identity",
    icon: "🪪",
    description: "Identity cards and official documents",
  },
  {
    name: "Financial",
    icon: "💳",
    description: "Bank, tax and financial documents",
  },
  {
    name: "Medical",
    icon: "🏥",
    description: "Medical and health documents",
  },
  {
    name: "Professional",
    icon: "💼",
    description: "Work and professional documents",
  },
  {
    name: "Travel",
    icon: "✈️",
    description: "Passport, visa and travel documents",
  },
  {
    name: "Other",
    icon: "📁",
    description: "Other important documents",
  },
];

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Delete states
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  // History states
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyDocument, setHistoryDocument] = useState(null);
  const [historyError, setHistoryError] = useState("");

  // Fetch documents
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

        // Show only active/current documents
        const currentDocuments = (data.documents || []).filter(
          (document) =>
            document.status === "active" &&
            document.isCurrent === true
        );

        setDocuments(currentDocuments);
      } catch (error) {
        console.error("Fetch Documents Error:", error);
        setError(error.message || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Count documents for a category
  const getCategoryCount = (categoryName) => {
    return documents.filter(
      (document) => document.category === categoryName
    ).length;
  };

  // Search documents
  const searchResults = documents.filter((document) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return false;

    return (
      document.documentName?.toLowerCase().includes(query) ||
      document.documentNumber?.toLowerCase().includes(query) ||
      document.category?.toLowerCase().includes(query) ||
      document.description?.toLowerCase().includes(query)
    );
  });

  // Documents of selected category
  const filteredDocuments = documents.filter(
    (document) => document.category === selectedCategory
  );

  // Open delete confirmation
  const openDeleteConfirmation = (document) => {
    setDocumentToDelete(document);
    setShowDeleteConfirm(true);
  };

  // Cancel delete
  const cancelDelete = () => {
    if (deletingId) return;

    setShowDeleteConfirm(false);
    setDocumentToDelete(null);
  };

  // Delete document
  const handleDelete = async () => {
    if (!documentToDelete) return;

    try {
      setDeletingId(documentToDelete._id);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/documents/${documentToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete document."
        );
      }

      // Remove deleted document from UI
      setDocuments((prevDocuments) =>
        prevDocuments.filter(
          (document) => document._id !== documentToDelete._id
        )
      );

      setShowDeleteConfirm(false);
      setDocumentToDelete(null);
    } catch (error) {
      console.error("Delete Document Error:", error);
      alert(error.message || "Failed to delete document.");
    } finally {
      setDeletingId(null);
    }
  };

  // Open version history
  const openHistory = async (document) => {
    try {
      setHistoryDocument(document);
      setShowHistory(true);
      setHistoryLoading(true);
      setHistoryError("");
      setHistory([]);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/documents/${document._id}/history`,
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
          data.message || "Failed to fetch document history."
        );
      }

      setHistory(data.history || []);
    } catch (error) {
      console.error("History Error:", error);

      setHistoryError(
        error.message || "Failed to load document history."
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  // Close history
  const closeHistory = () => {
    if (historyLoading) return;

    setShowHistory(false);
    setHistory([]);
    setHistoryDocument(null);
    setHistoryError("");
  };

  return (
    <div className="min-h-screen flex bg-[#F3F1F9]">
      <Sidebar />

      <main className="flex-1 bg-[#F7F4FF] p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-violet-700">
                My Documents
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Organize and access your documents by category.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mt-1 w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                🔍
              </span>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory(null);
                }}
                placeholder="Search documents..."
                className="w-full rounded-lg border border-[#E5E0F2] bg-white py-2.5 pl-9 pr-9 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-slate-500">
            Loading documents...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ================================================= */}
        {/* SEARCH RESULTS */}
        {/* ================================================= */}

        {!loading && searchQuery.trim() && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Search Results
                </h2>

                <p className="text-xs text-slate-500">
                  {searchResults.length}{" "}
                  {searchResults.length === 1
                    ? "document"
                    : "documents"}{" "}
                  found
                </p>
              </div>
            </div>

            {searchResults.length === 0 ? (
              <div className="rounded-xl border border-[#ECE8F7] bg-white p-10 text-center shadow-sm">
                <div className="text-4xl">🔍</div>

                <h3 className="mt-3 text-base font-semibold text-slate-700">
                  No documents found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try searching with a document name, number or category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {searchResults.map((document) => (
                  <DocumentCard
                    key={document._id}
                    document={document}
                    openHistory={openHistory}
                    openDeleteConfirmation={openDeleteConfirmation}
                    deletingId={deletingId}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================= */}
        {/* CATEGORY CARDS */}
        {/* ================================================= */}

        {!loading &&
          !searchQuery.trim() &&
          !selectedCategory && (
            <div className="grid grid-cols-4 gap-3">
              {categories.map((category) => {
                const count = getCategoryCount(category.name);

                return (
                  <div
                    key={category.name}
                    onClick={() =>
                      setSelectedCategory(category.name)
                    }
                    className="group cursor-pointer rounded-xl border border-[#ECE8F7] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-xl">
                      {category.icon}
                    </div>

                    {/* Name */}
                    <h2 className="mt-2 text-base font-semibold text-slate-800">
                      {category.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-1 text-xs leading-4 text-slate-500">
                      {category.description}
                    </p>

                    {/* Bottom */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {count}{" "}
                        {count === 1 ? "document" : "documents"}
                      </span>

                      <span className="text-sm text-violet-600 transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* ================================================= */}
        {/* SELECTED CATEGORY */}
        {/* ================================================= */}

        {!loading &&
          !searchQuery.trim() &&
          selectedCategory && (
            <div>
              {/* Back */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="mb-3 text-sm font-medium text-violet-600 hover:text-violet-800"
              >
                ← Back to Categories
              </button>

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedCategory} Documents
                  </h2>

                  <p className="text-sm text-slate-500">
                    {filteredDocuments.length}{" "}
                    {filteredDocuments.length === 1
                      ? "document"
                      : "documents"}
                  </p>
                </div>
              </div>

              {/* No documents */}
              {filteredDocuments.length === 0 && (
                <div className="rounded-xl border border-[#ECE8F7] bg-white p-8 text-center shadow-sm">
                  <div className="text-4xl">📁</div>

                  <h3 className="mt-3 text-base font-semibold text-slate-700">
                    No documents found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    You haven't added any documents to this category yet.
                  </p>
                </div>
              )}

              {/* Documents */}
              <div className="grid grid-cols-3 gap-3">
                {filteredDocuments.map((document) => (
                  <DocumentCard
                    key={document._id}
                    document={document}
                    openHistory={openHistory}
                    openDeleteConfirmation={openDeleteConfirmation}
                    deletingId={deletingId}
                  />
                ))}
              </div>
            </div>
          )}

      </main>

      {/* ================================================= */}
      {/* DELETE CONFIRMATION POPUP */}
      {/* ================================================= */}

      {showDeleteConfirm && documentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl">
              🗑️
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-800">
              Delete Document?
            </h2>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-slate-700">
                {documentToDelete.documentName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                disabled={!!deletingId}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={!!deletingId}
                className="rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* VERSION HISTORY POPUP */}
      {/* ================================================= */}

      {showHistory && historyDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Document History
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {historyDocument.documentName}
                </p>
              </div>

              <button
                onClick={closeHistory}
                disabled={historyLoading}
                className="text-xl text-slate-400 hover:text-slate-700 disabled:cursor-not-allowed"
              >
                ✕
              </button>
            </div>

            {/* Loading */}
            {historyLoading && (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500">
                  Loading history...
                </p>
              </div>
            )}

            {/* Error */}
            {historyError && (
              <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {historyError}
              </div>
            )}

            {/* History */}
            {!historyLoading &&
              !historyError &&
              history.length > 0 && (
                <div className="mt-5 space-y-3">
                  {history.map((version, index) => (
                    <div
                      key={version._id}
                      className={`rounded-lg border p-4 ${
                        version.isCurrent
                          ? "border-violet-200 bg-violet-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-800">
                              {index === 0
                                ? "Current Version"
                                : `Previous Version ${index}`}
                            </span>

                            {version.isCurrent && (
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                Current
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            Status: {version.status}
                          </p>

                          {version.documentNumber && (
                            <p className="mt-1 text-xs text-slate-500">
                              Document No: {version.documentNumber}
                            </p>
                          )}

                          {version.expiryDate && (
                            <p className="mt-1 text-xs text-slate-500">
                              Expiry:{" "}
                              {new Date(
                                version.expiryDate
                              ).toLocaleDateString("en-IN")}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-slate-400">
                            Saved:{" "}
                            {new Date(
                              version.createdAt
                            ).toLocaleDateString("en-IN")}
                          </p>
                        </div>

                        <a
                          href={version.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-violet-600 hover:text-violet-800"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* No previous versions */}
            {!historyLoading &&
              !historyError &&
              history.length <= 1 && (
                <div className="py-8 text-center">
                  <div className="text-3xl">📄</div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    No previous versions
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    This document has not been renewed yet.
                  </p>
                </div>
              )}

            {/* Close */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={closeHistory}
                disabled={historyLoading}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================================================= */
/* DOCUMENT CARD */
/* ================================================= */

const DocumentCard = ({
  document,
  openHistory,
  openDeleteConfirmation,
  deletingId,
}) => {
  return (
    <div className="rounded-xl border border-[#ECE8F7] bg-white p-3 shadow-sm">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-lg">
          📄
        </div>

        <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] text-violet-600">
          {document.category}
        </span>
      </div>

      {/* Document Name */}
      <h3 className="mt-2 truncate text-sm font-semibold text-slate-800">
        {document.documentName}
      </h3>

      {/* Document Number */}
      {document.documentNumber && (
        <p className="mt-0.5 truncate text-[11px] text-slate-500">
          No: {document.documentNumber}
        </p>
      )}

      {/* Expiry */}
      {document.expiryDate && (
        <p className="mt-1 text-[11px] text-slate-500">
          Expiry:{" "}
          {new Date(
            document.expiryDate
          ).toLocaleDateString("en-IN")}
        </p>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-1.5">
        {/* View */}
        <a
          href={document.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-lg bg-violet-50 px-2.5 py-1.5 text-[11px] font-semibold text-violet-600 hover:bg-violet-100"
        >
          View
        </a>

        {/* History */}
        {document.previousDocument && (
          <button
            onClick={() => openHistory(document)}
            className="whitespace-nowrap rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
          >
            History
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => openDeleteConfirmation(document)}
          disabled={deletingId === document._id}
          className="whitespace-nowrap rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] font-semibold text-red-500 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deletingId === document._id
            ? "Deleting..."
            : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default MyDocuments;