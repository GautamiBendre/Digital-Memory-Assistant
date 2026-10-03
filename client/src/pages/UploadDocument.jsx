import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const categories = [
  "Personal",
  "Educational",
  "Identity",
  "Financial",
  "Medical",
  "Professional",
  "Travel",
  "Other",
];

const UploadDocument = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Renewal mode
  const isRenewal = searchParams.get("renew") === "true";
  const previousDocumentId = searchParams.get("documentId");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [showSuccess, setShowSuccess] = useState(false);

  // =========================================================
  // SELECT FILE
  // =========================================================

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setExtractedData(null);
    setShowCategory(false);
    setShowSuccess(false);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  // =========================================================
  // UPLOAD & ANALYZE
  // =========================================================

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/gemini/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to analyze document."
        );
      }

      console.log(
        "Gemini extracted data:",
        data.extractedData
      );

      setExtractedData(data.extractedData);
    } catch (error) {
      console.error("Analysis Error:", error);

      alert(
        error.message ||
          "Failed to analyze document."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setExtractedData(null);
    setShowCategory(false);

    // If user came from Renew Now,
    // return to Reminders.
    if (isRenewal) {
      navigate("/reminders");
    }
  };

  // =========================================================
  // PROCEED TO CATEGORY
  // =========================================================

  const handleProceed = () => {
    setShowCategory(true);
  };

  // =========================================================
  // SAVE / RENEW DOCUMENT
  // =========================================================

  const handleFinalSave = async () => {
    if (!selectedFile || !extractedData) {
      alert("Please select and analyze a document first.");
      return;
    }

    if (isRenewal && !previousDocumentId) {
      alert(
        "Previous document information is missing."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // New uploaded file
      formData.append("file", selectedFile);

      // AI extracted information
      formData.append(
        "documentName",
        extractedData.documentType || "Document"
      );

      formData.append(
        "documentNumber",
        extractedData.documentNumber || ""
      );

      formData.append(
        "issueDate",
        extractedData.issueDate || ""
      );

      formData.append(
        "expiryDate",
        extractedData.expiryDate || ""
      );

      formData.append(
        "description",
        extractedData.description || ""
      );

      // User-selected category
      formData.append(
        "category",
        selectedCategory
      );

      // Renewal only
      if (isRenewal) {
        formData.append(
          "previousDocumentId",
          previousDocumentId
        );
      }

      // JWT token
      const token = localStorage.getItem("token");

      // Choose API based on mode
      const apiUrl = isRenewal
        ? "http://localhost:5000/api/documents/renew"
        : "http://localhost:5000/api/documents";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isRenewal
              ? "Failed to renew document."
              : "Failed to save document.")
        );
      }

      console.log(
        isRenewal
          ? "Document renewed:"
          : "Document saved:",
        data
      );

      // Show success popup
      setShowSuccess(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);

        setSelectedFile(null);
        setPreviewUrl(null);
        setExtractedData(null);
        setShowCategory(false);
        setSelectedCategory("Personal");

        // After renewal go back to reminders
        if (isRenewal) {
          navigate("/reminders");
        }
      }, 1500);

    } catch (error) {
      console.error(
        isRenewal
          ? "Renew Document Error:"
          : "Save Document Error:",
        error
      );

      alert(
        error.message ||
          (isRenewal
            ? "Failed to renew document."
            : "Failed to save document.")
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen flex bg-[#F3F1F9]">

      <Sidebar />

      <main className="flex-1 p-4 bg-[#F7F4FF]">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-4">

          <h1 className="text-2xl font-bold text-violet-700">
            {isRenewal
              ? "Renew Document"
              : "Upload Document"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {isRenewal
              ? "Upload the renewed document and let AI extract the important information."
              : "Upload your document and let AI extract the important information."}
          </p>

        </div>

        {/* ================================================= */}
        {/* UPLOAD SCREEN */}
        {/* ================================================= */}

        {!extractedData && (

          <div className="grid grid-cols-3 gap-4">

            {/* Upload Card */}

            <div className="col-span-2 rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                {isRenewal
                  ? "Upload Renewed File"
                  : "Upload File"}
              </h2>

              <label
                htmlFor="fileInput"
                className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50 hover:bg-violet-100"
              >

                <div className="mb-2 text-3xl text-violet-600">
                  ☁
                </div>

                <h3 className="text-base font-semibold text-slate-800">
                  Drag & Drop your document
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  or click to browse files
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  PNG • JPG • JPEG • PDF (Max 10 MB)
                </p>

                <input
                  id="fileInput"
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

              </label>

              {/* Selected File */}

              {selectedFile && (

                <div className="mt-2 rounded-lg bg-violet-50 px-3 py-2">

                  <p className="text-xs font-semibold text-slate-700">
                    Selected File
                  </p>

                  <p className="text-sm text-slate-500">
                    {selectedFile.name}
                  </p>

                </div>

              )}

              {/* Analyze */}

              <div className="mt-3 flex justify-end">

                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || loading}
                  className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:bg-violet-300"
                >
                  {loading
                    ? "Analyzing..."
                    : "Upload & Analyze"}
                </button>

              </div>

            </div>

            {/* Preview */}

            <div className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900">
                Preview
              </h2>

              <div className="mt-3 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-[#FBFAFF]">

                {previewUrl ? (

                  <img
                    src={previewUrl}
                    alt="Document Preview"
                    className="h-full w-full object-contain"
                  />

                ) : (

                  <p className="text-sm text-slate-400">
                    No document selected
                  </p>

                )}

              </div>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* AI EXTRACTION SCREEN */}
        {/* ================================================= */}

        {extractedData && !showCategory && (

          <div className="rounded-xl border border-[#ECE8F7] bg-white p-3 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              AI Extracted Information
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Review the information extracted from your document.
            </p>

            {/* Compact Information Box */}

            <div className="mt-2 rounded-lg bg-violet-50 p-3">

              {/* Main Information */}

              <div className="grid grid-cols-3 gap-x-6 gap-y-2">

                <Info
                  label="Document Type"
                  value={extractedData.documentType}
                />

                <Info
                  label="Name"
                  value={extractedData.name}
                />

                <Info
                  label="Document Number"
                  value={extractedData.documentNumber}
                />

                <Info
                  label="Issue Date"
                  value={extractedData.issueDate}
                />

                <Info
                  label="Expiry Date"
                  value={extractedData.expiryDate}
                />

                <Info
                  label="Description"
                  value={extractedData.description}
                />

              </div>

              {/* Additional Information */}

              {extractedData.additionalInformation &&
                Object.keys(
                  extractedData.additionalInformation
                ).length > 0 && (

                  <div className="mt-2 border-t border-violet-100 pt-2">

                    <h3 className="mb-1.5 text-xs font-semibold text-slate-800">
                      Additional Information
                    </h3>

                    <div className="grid grid-cols-4 gap-x-5 gap-y-1.5">

                      {Object.entries(
                        extractedData.additionalInformation
                      ).map(([key, value]) => (

                        <Info
                          key={key}
                          label={key}
                          value={value}
                        />

                      ))}

                    </div>

                  </div>

                )}

            </div>

            {/* Buttons */}

            <div className="mt-2 flex justify-end gap-2">

              <button
                onClick={handleCancel}
                className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleProceed}
                className="rounded-lg bg-violet-600 px-5 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
              >
                Proceed
              </button>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* CATEGORY SCREEN */}
        {/* ================================================= */}

        {extractedData && showCategory && (

          <div className="max-w-xl rounded-xl border border-[#ECE8F7] bg-white p-5 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-900">
              Select Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isRenewal
                ? "Choose the category for your renewed document."
                : "Choose where you want to store this document."}
            </p>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="mt-4 w-full rounded-lg border border-violet-100 bg-[#FBFAFF] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400"
            >

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>

            <div className="mt-4 flex justify-end gap-2">

              <button
                onClick={() => setShowCategory(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>

              <button
                onClick={handleFinalSave}
                disabled={loading}
                className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
              >
                {loading
                  ? isRenewal
                    ? "Renewing..."
                    : "Saving..."
                  : isRenewal
                  ? "Renew Document"
                  : "Save Document"}
              </button>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* SUCCESS POPUP */}
        {/* ================================================= */}

        {showSuccess && (

          <div className="fixed right-6 top-6 z-50 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">

            ✓{" "}
            {isRenewal
              ? "Document renewed successfully"
              : "Document saved successfully"}

          </div>

        )}

      </main>

    </div>
  );
};

// =========================================================
// INFORMATION COMPONENT
// =========================================================

const Info = ({ label, value }) => {
  let displayValue;

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    displayValue = "Not available";

  } else if (typeof value === "object") {

    displayValue = Object.entries(value)
      .map(([key, val]) => {

        if (
          val !== null &&
          typeof val === "object"
        ) {
          return `${key}: ${JSON.stringify(val)}`;
        }

        return `${key}: ${val}`;

      })
      .join(" • ");

  } else {
    displayValue = String(value);
  }

  return (
    <div className="min-w-0">

      <p className="text-[10px] leading-4 text-slate-400">
        {label}
      </p>

      <p
        className="mt-0.5 break-words text-xs font-semibold text-slate-800"
        title={displayValue}
      >
        {displayValue}
      </p>

    </div>
  );
};

export default UploadDocument;