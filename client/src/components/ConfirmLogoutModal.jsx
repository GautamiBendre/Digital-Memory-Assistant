import { FiLogOut } from "react-icons/fi";

const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="w-80 rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
            <FiLogOut className="text-violet-600 text-xl" />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">
              Logout
            </h2>

            <p className="text-[12px] text-slate-500">
              Are you sure you want to logout?
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
           className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 transition">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmLogoutModal;