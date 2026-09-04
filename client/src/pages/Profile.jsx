import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import PasswordModal from "../components/PasswordModal";

import {
  MdOutlineEdit,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLock,
  MdOutlineCheckCircle,
  MdOutlineCameraAlt,
  MdOutlineNotifications,
  MdOutlineDescription,
} from "react-icons/md";

import { FiUser } from "react-icons/fi";
import { PiWalletFill } from "react-icons/pi";
import { RiShieldCheckLine } from "react-icons/ri";

// Profile API
const API_BASE = "/api/profile";

async function saveProfileToServer(payload) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log("Status:", res.status);

  const text = await res.text();

  console.log("Response:", text);

  if (!res.ok) {
    throw new Error(text || "Failed to update profile");
  }

  return text ? JSON.parse(text) : {};
}

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Documents
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);

  const loggedInUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState({
    fullName: loggedInUser.name || "",
    email: loggedInUser.email || "",
    phone: loggedInUser.phone || "",
    password: "",
  });

  // Snapshot to revert to if the user cancels editing
  const [draft, setDraft] = useState(profile);

  const [reminders, setReminders] = useState({
    emailReminders: true,
    expiryAlerts: true,
  });

  // Fetch logged-in user's documents
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
        console.error("Profile Documents Error:", error);
      } finally {
        setDocumentsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Calculate days left until expiry
  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    return Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );
  };

  // Documents requiring an active reminder
  const reminderCount = documents.filter((document) => {
    if (!document.expiryDate) {
      return false;
    }

    const daysLeft = getDaysLeft(document.expiryDate);

    return daysLeft >= 0 && daysLeft <= 90;
  }).length;

  const startEdit = () => {
    setDraft(profile);
    setSaveError("");
    setSaveSuccess(false);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setSaveError("");
  };

  const handleChange = (field) => (e) => {
    setDraft((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");

    try {
      // Only send password if the user actually typed a new one
      const payload = { ...draft };

      if (!payload.password) {
        delete payload.password;
      }

      await saveProfileToServer(payload);

      // Update localStorage user data
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...loggedInUser,
          name: draft.fullName,
          email: draft.email,
          phone: draft.phone,
        })
      );

      setProfile({
        ...draft,
        password: "",
      });

      setEditing(false);
      setSaveSuccess(true);

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);

      setSaveError(
        err.message ||
          "Couldn't save changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleReminder = async (key) => {
    const next = {
      ...reminders,
      [key]: !reminders[key],
    };

    setReminders(next);

    try {
      await saveProfileToServer({
        reminderPreferences: next,
      });
    } catch {
      // Revert on failure
      setReminders(reminders);
    }
  };

  const infoRows = [
    {
      key: "fullName",
      label: "Full Name",
      icon: FiUser,
      type: "text",
      editable: true,
    },
    {
      key: "email",
      label: "Email",
      icon: MdOutlineEmail,
      type: "email",
      editable: false,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: MdOutlinePhone,
      type: "tel",
      editable: true,
    },
    {
      key: "password",
      label: "Password",
      icon: MdOutlineLock,
      type: "password",
      editable: false,
    },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#F3F1F9]">

      <Sidebar active="Profile" />

      {/* Main content */}
      <main className="flex-1 p-5 overflow-y-auto">

        {/* Profile Header */}
        <div className="mb-4 rounded-xl border border-violet-100 bg-gradient-to-r from-[#F7F2FF] to-[#FFF6FC] px-5 py-4">

          <div className="flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl font-bold text-white shadow">
                  {profile.fullName?.charAt(0).toUpperCase() ||
                    "U"}
                </div>

                <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow hover:bg-violet-50">
                  <MdOutlineCameraAlt className="text-xs text-violet-600" />
                </button>

              </div>

              <div>

                <h2 className="text-[18px] font-bold text-slate-900">
                  {profile.fullName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {profile.email}
                </p>

              </div>

            </div>

            {/* Right - Dynamic Stats */}
            <div className="flex gap-3">

              {/* Documents */}
              <div className="flex items-center gap-3 rounded-xl border border-violet-100 bg-white px-4 py-3 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
                  <MdOutlineDescription className="text-lg text-violet-600" />
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {documentsLoading
                      ? "-"
                      : documents.length}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Documents
                  </p>

                </div>

              </div>

              {/* Reminders */}
              <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white px-4 py-3 shadow-sm">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
                  <MdOutlineNotifications className="text-lg text-orange-500" />
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {documentsLoading
                      ? "-"
                      : reminderCount}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Reminders
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Personal Information */}
        <div className="col-span-2 rounded-xl border border-[#ECE8F7] bg-white px-4 py-3 shadow-sm">

          {/* Heading */}
          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <FiUser className="text-violet-600 text-base" />

              <h3 className="text-[15px] font-semibold text-slate-900">
                Personal Information
              </h3>

            </div>

            {!editing ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-semibold text-violet-700 hover:bg-violet-100 transition"
              >
                <MdOutlineEdit className="text-sm" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">

                <button
                  onClick={cancelEdit}
                  disabled={saving}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-gradient-to-r from-violet-700 to-purple-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:brightness-105 transition"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

              </div>
            )}

          </div>

          {/* Success message */}
          {saveSuccess && (
            <div className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700">
              Profile updated successfully.
            </div>
          )}

          {/* Error message */}
          {saveError && (
            <div className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-700">
              {saveError}
            </div>
          )}

          <div className="space-y-2">

            {infoRows.map(
              ({
                key,
                label,
                icon: Icon,
                type,
                placeholder,
                editable,
              }) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-violet-100 bg-[#FBFAFF] px-3 py-1.5"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                      <Icon className="text-[13px] text-violet-600" />
                    </div>

                    <span className="text-[13px] font-medium text-slate-700">
                      {label}
                    </span>

                  </div>

                  {editing && editable ? (
                    <input
                      type={type}
                      value={draft[key]}
                      onChange={handleChange(key)}
                      placeholder={placeholder || ""}
                      className="w-48 rounded-md border border-violet-100 px-3 py-1 text-right text-[13px] outline-none focus:ring-1 focus:ring-violet-400"
                    />
                  ) : key === "password" ? (
                    <div className="flex items-center gap-2">

                      <span className="tracking-widest text-[13px] text-slate-500">
                        ••••••••
                      </span>

                      <button
                        onClick={() =>
                          setShowPasswordModal(true)
                        }
                        className="text-[11px] font-medium text-violet-600 hover:text-violet-700"
                      >
                        Change
                      </button>

                    </div>
                  ) : (
                    <span className="text-[13px] font-medium text-slate-900">
                      {profile[key]}
                    </span>
                  )}

                </div>
              )
            )}

          </div>

        </div>

      </main>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

    </div>
  );
}