import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import useToast from "../../ui/toast/useToast";
import ConfirmModal from "../../ui/modal/ConfirmModal";

export default function Navbar() {
  const { logout, subscriptionPlan, role } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    showToast("Logged out successfully 👋", "success");
    navigate("/login");
  };

  const cleanRole = role?.replace("ROLE_", "");

  return (
    <>
      <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-40">
        {/* Logo */}
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate("/dashboard")}
        >
          VayuRakshak
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Subscription Badge */}
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
            {subscriptionPlan}
          </span>

          {/* Role */}
          <span className="text-sm text-gray-600 hidden sm:block">
            {cleanRole}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-150 shadow-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
