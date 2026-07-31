import Sidebar from "../components/Sidebar";

const UploadDocument = () => {
  return (
    <div className="min-h-screen flex bg-[#F3F1F9]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-5 bg-[#F7F4FF] overflow-y-auto">

        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-slate-900">
            Upload Document
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Securely upload and organize your important documents.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-3 gap-4">

          {/* Left */}
          <div className="col-span-2">

            {/* Upload Card */}
            <div className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

              <h2 className="mb-3 text-base font-semibold text-slate-900">
                Upload File
              </h2>

              <div className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-200 bg-violet-50 transition hover:bg-violet-100">

                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-2xl">
                  📄
                </div>

                <h3 className="text-sm font-semibold text-slate-800">
                  Drag & Drop your document
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  or click to browse files
                </p>

                <p className="mt-3 text-[11px] text-slate-400">
                  PNG • JPG • JPEG • PDF (Max 10 MB)
                </p>

              </div>

            </div>

          </div>

          {/* Right */}
          <div>

            <div className="rounded-xl border border-[#ECE8F7] bg-white p-4 shadow-sm">

              <h2 className="text-base font-semibold text-slate-900">
                Preview
              </h2>

              <div className="mt-3 flex h-52 items-center justify-center rounded-xl bg-[#FBFAFF] text-sm text-slate-400">
                No document selected
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default UploadDocument;