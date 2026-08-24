import { useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [showSuccess, setShowSuccess] = useState(false);

  // Select file
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

  // Upload and analyze
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
        throw new Error(data.error || data.message);
      }

      setExtractedData(data.extractedData);
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Failed to analyze document.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel
  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setExtractedData(null);
    setShowCategory(false);
  };

  // Proceed to category
  const handleProceed = () => {
    setShowCategory(true);
  };

  // Final save
  const handleFinalSave = () => {
    setShowSuccess(true);

    // Automatically hide success message
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex bg-[#F3F1F9]">

      <Sidebar />

      <main className="flex-1 p-4 bg-[#F7F4FF]">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-violet-700">
            Upload Document
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Upload your document and let AI extract the important information.
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
                Upload File
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
                  {loading ? "Analyzing..." : "Upload & Analyze"}
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
          <div className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-900">
              AI Extracted Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the information extracted from your document.
            </p>

            {/* Compact Information Box */}
            <div className="mt-3 rounded-lg bg-violet-50 p-4">

              <div className="grid grid-cols-2 gap-x-8 gap-y-3">

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
                Object.keys(extractedData.additionalInformation).length > 0 && (

                  <div className="mt-3 border-t border-violet-100 pt-3">

                    <h3 className="mb-2 text-sm font-semibold text-slate-800">
                      Additional Information
                    </h3>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">

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
            <div className="mt-3 flex justify-end gap-2">

              <button
                onClick={handleCancel}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleProceed}
                className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
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
              Choose where you want to store this document.
            </p>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-4 w-full rounded-lg border border-violet-100 bg-[#FBFAFF] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
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
                className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Save Document
              </button>

            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* SUCCESS POPUP */}
        {/* ================================================= */}

        {showSuccess && (
          <div className="fixed right-6 top-6 z-50 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg">
            ✓ Document saved successfully
          </div>
        )}

      </main>
    </div>
  );
};


/* ================================================= */
/* INFORMATION COMPONENT */
/* ================================================= */

const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-semibold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
};

export default UploadDocument;