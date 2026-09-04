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

        setDocuments(data.documents || []);
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

  // Documents of selected category
  const filteredDocuments = documents.filter(
    (document) => document.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex bg-[#F3F1F9]">

      <Sidebar />

      <main className="flex-1 bg-[#F7F4FF] p-5">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-violet-700">
            My Documents
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Organize and access your documents by category.
          </p>
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

        {/* Category Cards */}
        {!loading && !selectedCategory && (
          <div className="grid grid-cols-4 gap-4">

            {categories.map((category) => {
              const count = getCategoryCount(category.name);

              return (
                <div
                  key={category.name}
                  onClick={() =>
                    setSelectedCategory(category.name)
                  }
                  className="group cursor-pointer rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-2xl">
                    {category.icon}
                  </div>

                  {/* Name */}
                  <h2 className="mt-3 text-base font-semibold text-slate-800">
                    {category.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>

                  {/* Bottom */}
                  <div className="mt-3 flex items-center justify-between">

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

        {/* Selected Category */}
        {!loading && selectedCategory && (
          <div>

            {/* Back */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 text-sm font-medium text-violet-600 hover:text-violet-800"
            >
              ← Back to Categories
            </button>

            <div className="mb-4 flex items-center justify-between">
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
            <div className="grid grid-cols-3 gap-4">

              {filteredDocuments.map((document) => (
                <div
                  key={document._id}
                  className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm"
                >

                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-xl">
                      📄
                    </div>

                    <span className="rounded-full bg-violet-50 px-2 py-1 text-xs text-violet-600">
                      {document.category}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-800">
                    {document.documentName}
                  </h3>

                  {document.documentNumber && (
                    <p className="mt-1 text-xs text-slate-500">
                      No: {document.documentNumber}
                    </p>
                  )}

                  {document.expiryDate && (
                    <p className="mt-2 text-xs text-slate-500">
                      Expiry:{" "}
                      {new Date(
                        document.expiryDate
                      ).toLocaleDateString("en-IN")}
                    </p>
                  )}

                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs font-semibold text-violet-600 hover:text-violet-800"
                  >
                    View Document →
                  </a>

                </div>
              ))}

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default MyDocuments;