import { useState } from "react";
import {
  MdOutlineHome,
  MdOutlineDescription,
  MdOutlineCloudUpload,
  MdOutlineNotifications,
  MdOutlineLogout,
} from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { PiWalletFill } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: MdOutlineHome },
  { label: "My Documents", path: "/documents", icon: MdOutlineDescription },
  { label: "Upload Document", path: "/upload", icon: MdOutlineCloudUpload },
  { label: "Reminders", path: "/reminders", icon: MdOutlineNotifications },
  { label: "Profile", path: "/profile", icon: FiUser },
];

const Sidebar = () => {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
  setShowLogoutModal(true);
};

const confirmLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setShowLogoutModal(false);

  navigate("/");
};

const cancelLogout = () => {
  setShowLogoutModal(false);
};

  return (
    <aside className="w-48 bg-white border-r border-[#ECE8F7] flex flex-col p-2 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shrink-0 mt-1 p-1">
          <PiWalletFill className="w-4.5 h-4.5 text-white" />
        </div>

        <span className="text-base font-bold text-slate-900 p-1 mt-1">
          MemoryVault
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => {
         const isActive = location.pathname === path;
          return (
            <button
              key={label}
            onClick={() => navigate(path)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition ${
                isActive
                  ? "bg-purple-200 text-purple-600 font-semibold"
                  : "text-slate-500 hover:bg-[#F8F7FC]"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-[#ECE8F7] pt-3 mb-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-[#F8F7FC] transition"
        >
          <MdOutlineLogout className="w-4.5 h-4.5" />
          Logout
        </button>
      </div>

      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

    </aside>
  );
};

export default Sidebar;