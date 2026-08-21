import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  MdOutlineCloudUpload,
  MdDescription,
} from "react-icons/md";

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
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showExtractedInfo, setShowExtractedInfo] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileSelect = (file) => {
    setError("");

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG and PDF files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      return;
    }

    setSelectedFile(file);
    setShowExtractedInfo(false);
    setShowCategory(false);
    setSelectedCategory("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setError("Please select a document first.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    // Temporary simulation.
    // We will replace this with OCR + Gemini later.
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowExtractedInfo(true);
    }, 1500);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setShowExtractedInfo(false);
    setShowCategory(false);
    setSelectedCategory("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveDocument = () => {
    setShowCategory(true);
  };

 const handleFinalSave = () => {
  if (!selectedCategory) {
    setError("Please select a category.");
    return;
  }

  setError("");

  // Temporary success popup
  setShowSuccess(true);

  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
};

  return (
    <div className="h-screen flex overflow-hidden bg-[#F3F1F9]">

      {/* Success Popup */}
        {showSuccess && (
          <div className="fixed right-5 top-5 z-50">
            <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white px-5 py-4 shadow-lg">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Document saved successfully!
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Your document has been added to MemoryVault.
                </p>
              </div>

            </div>
          </div>
        )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-hidden bg-[#F7F4FF] p-4">

        {/* ================= HEADER ================= */}
        <div className="mb-3">
         <h1 className="text-xl font-bold text-purple-700">
            Upload Document
          </h1>

          <p className="mt-1 text-xs text-violet-800">
            Upload your document and let AI extract the important information.
          </p>
        </div>

        {/* ================= UPLOAD STAGE ================= */}
        {!showExtractedInfo && !showCategory && (
          <div className="grid grid-cols-3 gap-4">

            {/* LEFT - UPLOAD */}
            <div className="col-span-2 rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

              <h2 className="mb-3 text-base font-semibold text-purple-700">
                Upload File
              </h2>

              {/* Hidden Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload Area */}
              <div
                onClick={!isAnalyzing ? handleBrowseClick : undefined}
                className={`flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50 transition ${
                  !isAnalyzing
                    ? "cursor-pointer hover:bg-violet-100"
                    : "cursor-not-allowed opacity-70"
                }`}
              >

                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-violet-100">
                  <MdOutlineCloudUpload className="text-2xl text-violet-600" />
                </div>

                <h3 className="text-sm font-semibold text-slate-800">
                  Drag & Drop your document
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  or click to browse files
                </p>

                <p className="mt-2 text-[11px] text-slate-400">
                  PNG • JPG • JPEG • PDF (Max 10 MB)
                </p>

              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                    <MdDescription className="text-lg text-violet-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-slate-500">
                      Selected File
                    </p>

                    <p className="truncate text-xs font-medium text-slate-800">
                      {selectedFile.name}
                    </p>
                  </div>

                </div>
              )}

              {/* Error */}
              {error && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {error}
                </p>
              )}

              {/* Analyze Button */}
              <div className="mt-3 flex justify-end">

                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${
                    selectedFile && !isAnalyzing
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "cursor-not-allowed bg-violet-300"
                  }`}
                >
                  {isAnalyzing
                    ? "Analyzing..."
                    : "Upload & Analyze"}
                </button>

              </div>

            </div>

            {/* RIGHT - PREVIEW */}
            <div className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

              <h2 className="text-base font-semibold text-slate-900">
                Preview
              </h2>

              <div className="mt-3 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-[#FBFAFF]">

                {!selectedFile && (
                  <div className="text-center">
                    <MdDescription className="mx-auto text-4xl text-violet-200" />

                    <p className="mt-2 text-xs text-slate-400">
                      No document selected
                    </p>
                  </div>
                )}

                {selectedFile &&
                  selectedFile.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Document preview"
                      className="h-full w-full object-contain"
                    />
                  )}

                {selectedFile &&
                  selectedFile.type === "application/pdf" && (
                    <div className="text-center px-3">
                      <MdDescription className="mx-auto text-4xl text-violet-400" />

                      <p className="mt-2 truncate text-xs text-slate-500">
                        {selectedFile.name}
                      </p>
                    </div>
                  )}

              </div>

            </div>

          </div>
        )}

        {/* ================= EXTRACTED INFORMATION ================= */}
        {showExtractedInfo && !showCategory && (
          <div className="max-w-2xl">

            <div className="rounded-xl border border-[#ECE8F7] bg-white p-5 shadow-sm">

              <h2 className="text-base font-semibold text-slate-900">
                AI Extracted Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review the information extracted from your document.
              </p>

              <div className="mt-4 rounded-lg bg-violet-50 p-4">
                <p className="text-xs text-slate-500">
                  AI extraction results will appear here.
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  OCR and Gemini AI will be connected next.
                </p>
              </div>

              <div className="mt-4 flex justify-end gap-2">

                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveDocument}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700"
                >
                  Save Document
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ================= CATEGORY ================= */}
        {showCategory && (
          <div className="max-w-md">

            <div className="rounded-xl border border-[#ECE8F7] bg-white p-5 shadow-sm">

              <h2 className="text-base font-semibold text-slate-900">
                Select Category
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Choose where you want to store this document.
              </p>

              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setError("");
                }}
                className="mt-4 w-full rounded-lg border border-[#ECE8F7] bg-[#FBFAFF] px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {error && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {error}
                </p>
              )}

              <div className="mt-4 flex justify-end gap-2">

                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleFinalSave}
                  disabled={!selectedCategory}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold text-white ${
                    selectedCategory
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "cursor-not-allowed bg-violet-300"
                  }`}
                >
                  Save Document
                </button>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default UploadDocument;