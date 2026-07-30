import { useState } from "react";
import { FiLock, FiX } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PASSWORD_API = "/api/password";

async function changePassword(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(PASSWORD_API, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

const PasswordModal = ({ isOpen, onClose }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
  setError("");
  setSuccess("");

  // Validation
  if (
    !formData.currentPassword ||
    !formData.newPassword ||
    !formData.confirmPassword
  ) {
    setError("Please fill all fields.");
    return;
  }

  if (formData.newPassword !== formData.confirmPassword) {
    setError("New password and confirm password do not match.");
    return;
  }

  try {
    setLoading(true);

    const response = await changePassword(formData);

    setSuccess(response.message);

    // Clear input fields
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Close modal after 1.5 seconds
    setTimeout(() => {
      onClose();
      setSuccess("");
    }, 1500);

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="w-[350px] rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100">
              <FiLock className="text-base text-violet-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Change Password
              </h2>
              <p className="text-xs text-slate-500">
                Update your account password.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Current Password */}
        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#ECE8F7] bg-[#FBFAFF] px-2.5 py-1 pr-10 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showCurrent ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#ECE8F7] bg-[#FBFAFF] px-2.5 py-1 pr-10 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showNew ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#ECE8F7] bg-[#FBFAFF] px-2.5 py-1 pr-10 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-2 py-1 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 rounded-lg bg-green-50 border border-green-200 px-2 py-1 text-sm text-green-600">
            {success}
          </div>
        )}


        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });

              setError("");
              setSuccess("");
              onClose();
            }}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

         <button
          type="button"
          onClick={handleUpdatePassword}
          disabled={loading}
          className="rounded-lg bg-violet-600 px-3 py-1 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
        </div>

      </div>
    </div>
  );
};

export default PasswordModal;